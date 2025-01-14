const { test: base } = require('@playwright/test');

exports.test = base.extend({
    testDataForOrder: async ({}, use) => {
        await use({
            userEmail: "",
            userPassword: "",
            productName: "",
        });
    },
});