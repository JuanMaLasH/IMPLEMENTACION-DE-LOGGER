import { UserModel } from "../daos/mongodb/models/user.model.js";
import { CartModel } from "../daos/mongodb/models/carts.model.js";
import jwt from "jsonwebtoken";
import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import { UserDTO } from "../dto/user.dto.js";

export class UserManager {
  async register(req, res) {
    const { first_name, last_name, email, password, age } = req.body;
    try {
      const existeUsuario = await UserModel.findOne({ email });
      if (existeUsuario) {
        return res.status(400).send("El usuario ya existe");
      }
      const nuevoCarrito = new CartModel();
      await nuevoCarrito.save();
      const nuevoUsuario = new UserModel({
        first_name,
        last_name,
        email,
        cart: nuevoCarrito._id, 
        password: createHash(password),
        age
      });
      await nuevoUsuario.save();
      const token = jwt.sign({ user: nuevoUsuario }, "coderhouse", {
        expiresIn: "1h"
      });
      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true
      });
      res.redirect("/api/users/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
}

  async login(req, res) {
    const { email, password } = req.body;
    try {
      const usuarioEncontrado = await UserModel.findOne({ email });
      if (!usuarioEncontrado) {
        return res.status(401).send("Usuario no válido");
      }
      const esValido = isValidPassword(password, usuarioEncontrado);
      if (!esValido) {
        return res.status(401).send("Contraseña incorrecta");
      }
      const token = jwt.sign({ user: usuarioEncontrado }, "coderhouse", {
        expiresIn: "1h"
      });
      res.cookie("coderCookieToken", token, {
        maxAge: 3600000,
        httpOnly: true
      });
      res.redirect("/api/users/profile");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error interno del servidor");
    }
  }

  async profile(req, res) {
    const userDto = new UserDTO(req.user.first_name, req.user.last_name, req.user.role);
    const isAdmin = req.user.role === 'admin';
    res.render("profile", { user: userDto, isAdmin });
  }

  async logout(req, res) {
    res.clearCookie("coderCookieToken");
    res.redirect("/login");
  }

  async admin(req, res) {
    if (req.user.user.role !== "admin") {
      return res.status(403).send("Acceso denegado");
    }
    res.render("admin");
  }
}
