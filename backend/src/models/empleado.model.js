import mongoose from "mongoose";
const { Schema, model } = mongoose;

const employeeSchema = new Schema(
  {
    nombres: {
      type: String,
      required: true,
    },
    apellidos: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    tcontrato: {
      type: String,
      required: true,
    },
    usuario: { type: Schema.ObjectId, ref: "usuario" },
  },
  {
    timestamps: true,
  }
);

export const EmpleadoModel = model("empleado", employeeSchema);
