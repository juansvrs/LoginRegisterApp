import { EmpleadoModel } from "../models/empleado.model.js";
import message from "../utils/messages.js";
const { messageGeneral } = message;
const empleadoCtrl = {};

// no se usa desde el frontend
empleadoCtrl.listAllEmployees = async (req, res) => {
  try {
    const resp = await EmpleadoModel.find().populate({
      path: "usuario",
      select: "-password",
    });

    messageGeneral(res, 200, true, resp, "Lista de empleados");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

empleadoCtrl.createEmployee = async (req, res) => {
  try {
    const data = req.body;
    const resp = await EmpleadoModel.create({ ...data, usuario: req.userid });
    messageGeneral(res, 201, true, resp, "Empleado creado");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

empleadoCtrl.listById = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await EmpleadoModel.findById(id);
    if (!resp) {
      return messageGeneral(res, 404, false, "", "Empleado no encontrado");
    }
    messageGeneral(res, 200, true, resp, "");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

empleadoCtrl.listEmployeeBoss = async (req, res) => {
  try {
    // const { id } = req.params;
    const resp = await EmpleadoModel.find({ usuario: req.userid }).populate({
      path: "usuario",
      select: "-password",
    });
    messageGeneral(res, 200, true, resp, "");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

empleadoCtrl.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await EmpleadoModel.findById(id);
    if (!resp) {
      return messageGeneral(res, 404, false, "", "Empleado no encontrado");
    }
    await resp.deleteOne();
    messageGeneral(res, 200, true, "", "Empleado eliminado");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

empleadoCtrl.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await EmpleadoModel.findById(id);
    if (!resp) {
      return messageGeneral(res, 404, false, "", "Empleado no encontrado");
    }
    await resp.updateOne(req.body);
    messageGeneral(res, 200, true, "", "Empleado actualizado");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

empleadoCtrl.searchEmployee = async (req, res) => {
  try {
    const { nombres } = req.params;
    const resp = await EmpleadoModel.find({
      nombres: { $regex: ".*" + nombres + ".*" },
      usuario: req.userid,
    });
    messageGeneral(res, 200, true, resp, "");
  } catch (error) {
    messageGeneral(res, 500, false, "", error.message);
  }
};

export default empleadoCtrl;
