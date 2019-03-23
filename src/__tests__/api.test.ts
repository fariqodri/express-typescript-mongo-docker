import chai = require("chai")
import http = require('chai-http');
import { expect } from 'chai';
import {test} from "mocha"

import app from '../config/app';
import { IndexedDataModel, KursModel } from '../models';

chai.use(http);

describe('Crawl API', () => {
    const emptyTable = async () => {
        IndexedDataModel.deleteMany({}, () =>
            console.log('Indexed Data emptied')
        );
        KursModel.deleteMany({}, () => console.log('Kurs emptied'));
    };

    before(async () => {
        await emptyTable();
    });

    after(async () => {
        await emptyTable();
    });

    it('Should add data to database', async () => {
        return chai
            .request(app)
            .get('/api/indexing')
            .then(res => {
                expect(res.status).to.equal(200);
                IndexedDataModel.estimatedDocumentCount((_, count) =>
                    expect(count).to.greaterThan(0)
                );
                KursModel.estimatedDocumentCount((_, count) =>
                    expect(count).to.greaterThan(0)
                );
                expect(res.body).to.have.property("data")
                expect(res.body.data).to.be.an("array")
            });
    });
});

describe('Delete record by date', () => {
    const date = '2019-03-21';
    const fillDatabaseWithDate = async (date: Date) => {
        const indexedData = new IndexedDataModel({
            type: 'e-rate',
            datetime: date,
            kurs_data: [{
                currency: "USD",
                price: 15000,
                kurs_type: "beli"
            }]
        });
        indexedData.save()
    };

    before(async () => {
        await fillDatabaseWithDate(new Date(date))
    })

    test(`should delete all indexed data with date ${date}`, async () => {
        return chai
            .request(app)  
            .delete(`/api/kurs/${date}`)
            .then(res => {
                IndexedDataModel.countDocuments({datetime: new Date(date)}, (_, count) => expect(count).to.equal(0))
                expect(res.status).to.equal(200)
                expect(res.body).to.have.property("deleted")
                expect(res.body.deleted).to.be.an("array")
            })
    })
});
