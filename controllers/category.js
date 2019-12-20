const express = require('express');
const handlebars = require('handlebars');

const mCat = require('../Models/category');
const mPro = require('../Models/product');


module.exports = {
    getAll: async(req, res) => {
        try {
            const cats = await mCat.all();
            //const products = await mPro.all();
            for (let cat of cats) {
                cat.isActive = false;
            }
            cats[0].isActive = true;
            console.log(cats)
            res.render('home', {
                title: 'Online Auction',
                cats: cats,
            });
        } catch (error) {
            console.log('Error Controller Category getAll: ', error)
        }
    },
    getTop: async(req, res) => {
        // const id = parseInt(req.params.id);
        const catID = 4;
        try {

            const ps = await mPro.allByCatId(catID);
            console.log(ps)
            res.render('home', {
                title: 'Online Auction',
                showList: true,
                title_top: 'Top 5 newest',
                ps: ps
            });
        } catch (error) {
            console.log('Error Controller Category getByCatId', error)
        }
    },
    getByCatId: async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            const cats = await mCat.all();
            const ps = await mPro.allByCatId(id);
            //console.log(ps)
            for (let cat of cats) {
                cat.isActive = false;
                if (cat.CatID === id) {
                    cat.isActive = true;
                }
            }

            res.render('home', {
                title: 'SHOPPING...',
                cats: cats,
                showList: true,
                ps: ps
            });
        } catch (error) {
            console.log('Error Controller Category getByCatId', error)
        }
    }
}