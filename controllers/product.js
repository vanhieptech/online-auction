const express = require("express");
const handlebars = require("handlebars");
const mCat = require("../models/category");
const mPro = require("../models/product");

module.exports = {
    getAll: async(req, res) => {
        try {
            const cats = await mCat.all();
            for (let cat of cats) {
                cat.isActive = false;
            }
            cats[0].isActive = true;
            res.render("home", {
                title: "cat test",
                cats: catsz
            });
        } catch (error) {
            console.log("Error Controller Category getAll: ", error);
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
    }
};