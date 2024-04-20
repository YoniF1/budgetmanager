import {
    _getCategories,
    _getUserFinancialData,
    _getUserPersonalData
  } from "../models/hackmodels.js";

export const getCategories = (req, res) => {
    _getCategories()
      .then((data) => {
      res.json(data);
      })
      .catch((e) => {
      res.status(404).json({ msg: "something went wrong" });
      console.log(e);
      });
  };

  export const getAmount = (req, res) => {
    const { id } = req.params;
    _getUserFinancialData(id)
      .then((data) => {
      res.json(data);
      })
      .catch((e) => {
      res.status(404).json({ msg: "something went wrong" });
      console.log(e);
      });
  };

  export async function getUserPersonalData(id) {
    try {
      return _getUserPersonalData(id); 
    } catch (error) {
      console.error('Error retrieving user personal data:', error);
      throw error;
    }
  };

  export async function getUserFinancialData(id) {
    try {
      return _getUserFinancialData(id); 
    } catch (error) {
      console.error('Error retrieving user financial data:', error);
      throw error;
    }
  }


