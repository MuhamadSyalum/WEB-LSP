import Info from "../models/InfoModel.js";
import path from "path";
import fs from "fs";

// Get all info
export const getInfos = async (req, res) => {
    try {
        const response = await Info.findAll();
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error retrieving data" });
    }
};

// Get info by ID
export const getInfoById = async (req, res) => {
    try {
        const response = await Info.findOne({
            where: {
                id: req.params.id
            }
        });
        if (!response) {
            return res.status(404).json({ msg: "Info not found" });
        }
        res.json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error retrieving data" });
    }
};

// Save info
export const saveInfo = async (req, res) => {
    if (!req.files || !req.files.files) {
        return res.status(400).json({ msg: "No Files Uploaded" });
    }

    const judul = req.body.judul;
    const ket = req.body.ket;
    const files = Array.isArray(req.files.files) ? req.files.files : [req.files.files]; // Ensure files are in array
    const allowedType = ['.png', '.jpg', '.jpeg'];
    const maxFileSize = 5000000;
    let gambar = [];

    try {
        const fileMoves = files.map(file => {
            const ext = path.extname(file.name).toLowerCase();
            if (!allowedType.includes(ext)) {
                throw new Error("Invalid Images");
            }
            if (file.data.length > maxFileSize) {
                throw new Error("Image must be less than 5 MB");
            }
            const fileName = `${file.md5}${ext}`;
            gambar.push(fileName);
            return file.mv(`./public/images/${fileName}`);
        });

        // Wait for all file movements to complete
        await Promise.all(fileMoves);

        const urlGambar = gambar.map(fileName => `${req.protocol}://${req.get("host")}/images/${fileName}`);
        await Info.create({ judul: judul, gambar: JSON.stringify(urlGambar), ket: ket });

        res.status(201).json({ msg: "Info Created Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(422).json({ msg: error.message });
    }
};

// Delete info
export const deleteInfo = async (req, res) => {
    const info = await Info.findOne({
        where: {
            id: req.params.id
        }
    });

    if (!info) return res.status(404).json({ msg: "No Data Found" });

    const gambar = JSON.parse(info.gambar || "[]");
    for (const fileName of gambar) {
        const filePath = `./public/images/${path.basename(fileName)}`;
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);  // Delete each image file
        }
    }

    try {
        await Info.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json({ msg: "Info Deleted Successfully" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: "Error deleting info" });
    }
};
