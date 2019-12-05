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
            res.render('home', {
                title: 'cat test',
                cats: cats,
            });
        } catch (error) {
            console.log('Error Controller Category getAll: ', error)
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