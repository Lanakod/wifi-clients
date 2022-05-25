const { Request, Response } = require("express"),
  DataService = require("../services/data.service"),
  { Server } = require("socket.io");

class DataController {
  io;

  /**
   * @param {Server} io
   */
  constructor(io) {
    this.io = io;
  }

  /**
   * @param {Request} req
   * @param {Response} res
   */
  set = async (req, res) => {
    const { deviceName, ssid } = req.body;

    try {
      return res.status(200).json(DataService.set(this.io, deviceName, ssid));
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  /**
   * @param {Request} req
   * @param {Response} res
   */
  del = async (req, res) => {
    const { deviceName } = req.body;

    try {
      return res.status(200).json(DataService.del(this.io, deviceName));
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  };

  /**
   * @param {Request} req
   * @param {Response} res
   */
  fetch = async (req, res) => {
    try {
      return res.status(200).json(DataService.fetch(this.io));
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
}

module.exports = DataController;
