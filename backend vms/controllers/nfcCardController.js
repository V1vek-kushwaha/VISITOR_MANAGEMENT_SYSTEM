const db = require("../models");
const NfcCard = db.nfc_cards;
const Visitor = db.Visitor;

// Create
exports.createCard = async (req, res) => {
  try {
    const { visitor_id, card_uid, scan_data, issued_at } = req.body;

    const visitor = await Visitor.findByPk(visitor_id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    const card = await NfcCard.create({
      visitor_id,
      card_uid,
      scan_data,
      issued_at
    });

    res.status(201).json({ success: true, message: "Card issued", data: card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get all
exports.getAllCards = async (req, res) => {
  try {
    const cards = await NfcCard.findAll({
      include: [{ model: Visitor, as: "visitor", attributes: ["id", "name"] }]
    });
    res.status(200).json({ success: true, data: cards });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Get one
exports.getCardById = async (req, res) => {
  try {
    const card = await NfcCard.findByPk(req.params.id, {
      include: [{ model: Visitor, as: "visitor", attributes: ["id", "name"] }]
    });
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json({ success: true, data: card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Update
exports.updateCard = async (req, res) => {
  try {
    const card = await NfcCard.findByPk(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    await card.update(req.body);
    res.json({ success: true, message: "Card updated", data: card });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// Delete (soft or hard)
exports.deleteCard = async (req, res) => {
  try {
    const card = await NfcCard.findByPk(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });

    await card.destroy();
    res.json({ success: true, message: "Card deleted" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
