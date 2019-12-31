const express = require("express");
const handlebars = require("handlebars");
const mCat = require("../models/category");
const mPro = require("../models/product");

module.exports = {
    getAll: async(req, res) => {
        try {
            const cats = await mCat.all();

            const products = await mPro.all();

            var CatIDofProduct = 1;
            for (let product of products) {
                CatIDofProduct = product.CatID;
                product.CatName = cats[CatIDofProduct - 1].CatName;
            }


            console.log(`cat`, cats[3]);
            // console.log("+++", products)
            res.render("vwAdmin/products", {
                layout: "admin",
                products: products
            });
        } catch (error) {
            console.log("Error Controller Products getAll: ", error);
        }
    },
    getByProId: async(req, res) => {
        const proId = parseInt(req.params.id);
        try {
            const product = await mPro.getDetailById(proId);

            res.render("vwProducts/detail", {
                title: "Product Detail",
                product: product
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    },
    delete: async(req, res) => {
        const ProID = parseInt(req.params.id);
        mPro.deleteOne(ProID, (err, result) => {
            if (err) {
                return res.status(501).json({
                    message: 'Not able to delete product'
                });
            }

            return res.json({
                id: ProID,
                name: 'product'
            });
        });
    }
};