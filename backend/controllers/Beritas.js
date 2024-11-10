import Berita from "../models/BeritaModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getBeritas = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Berita.findAll({
                attributes:['uuid','judul','keterangan'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Berita.findAll({
                attributes:['uuid','judul','keterangan'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getBeritaById = async(req, res) =>{
    try {
        const berita = await Berita.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!berita) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Berita.findOne({
                attributes:['uuid','judul','keterangan'],
                where:{
                    id: berita.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Berita.findOne({
                attributes:['uuid','judul','keterangan'],
                where:{
                    [Op.and]:[{id: berita.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createBerita = async(req, res) =>{
    const {judul, keterangan} = req.body;
    try {
        await Berita.create({
            judul: judul,
            keterangan: keterangan,
            userId: req.userId
        });
        res.status(201).json({msg: "Berita Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateBerita = async(req, res) =>{
    try {
        const berita = await Berita.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!berita) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {judul, keterangan} = req.body;
        if(req.beritarole === "admin"){
            await Berita.update({judul, keterangan},{
                where:{
                    id: berita.id
                }
            });
        }else{
            if(req.userId !== berita.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Berita.update({judul, keterangan},{
                where:{
                    [Op.and]:[{id: berita.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "berita updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteBerita = async(req, res) =>{
    try {
        const berita = await Berita.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!berita) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {judul, keterangan} = req.body;
        if(req.role === "admin"){
            await Berita.destroy({
                where:{
                    id: berita.id
                }
            });
        }else{
            if(req.userId !== berita.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Berita.destroy({
                where:{
                    [Op.and]:[{id: berita.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "berita deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}