const express = require('express');
const bcrypt = require('bcryptjs');
const _ = require('underscore');
const Lamina = require('../models/lamina')

const app = express();

app.get('/Lamina', function(req, res) {

    let desde = req.query.desde || 0;
    desde = Number(desde);


    let limite = req.query.limite || 0;
    limite = Number(limite);

    Lamina.find({}, 'numero nombre n_seccion seccion')
        .limit(limite)
        .skip(desde)
        .exec((err, lamina) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            lamina.count({}, (err, conteo) => {
                res.json({
                    ok: true,
                    cuantos: conteo,
                    laminas: lamina
                });
            });
        });
});


app.post('/Lamina', function(req, res) {
    let body = req.body;

    let lamina = new Lamina({
        numero: body.numero,
        nombre: body.nombre,
        n_seccion: body.n_seccion,
        seccion: body.seccion

    });

    lamina.save((err, laminaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            laminas: laminaBD
        });
    });

});


app.put('/Lamina/:id', function(req, res) {
    let id = req.params.id
    let body = _.pick(req.body, ['numero', 'nombre', 'n_seccion', 'seccion']);

    Lamina.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, laminaBD) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            laminas: laminaBD
        });
    });


});


app.delete('/Lamina', function(req, res) {
    let id = req.body.id;

    Lamina.findByIdAndRemove(id, (err, laminaBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        if (laminaBorrado === null) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Lamina no encontrada'
                }
            });
        }
        res.json({
            ok: true,
            laminas: laminaBorrado
        });
    });
});

module.exports = app;