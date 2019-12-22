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
                cats: cats
            });
        } catch (error) {
            console.log("Error Controller Category getAll: ", error);
        }
    },
    getByProId: async(req, res) => {
        const id = parseInt(req.params.id);
        try {
            const cats = await mCat.all();
            const products = await mPro.getDetailById(id);

            for (let cat of cats) {
                cat.isActive = false;
                if (cat.CatID === id) {
                    cat.isActive = true;
                }
            }

            res.render("home", {
                title: "Product Detail",
                cats: cats,
                showList: false,
                ps: products
            });
        } catch (error) {
            console.log("Error Controller Product getByProId", error);
        }
    }
};