const db = require('../../models');
const VisitorPass = db.VisitorPass;
const User = db.User;

// Helper: Generate 6-digit random pass ID
const generatePassId = () => Math.floor(100000 + Math.random() * 900000).toString();

exports.createVisitorPass = async (req, res) => {
  try {
    const { visit_purpose, whom_to_visit, visit_department, visitor_id, keey, valid_until, zones_allow, zone_names, visitor } = req.body;

    // Format zones_allow as an array of strings if it is not an array already
    const formattedZones = Array.isArray(zones_allow)
      ? zones_allow
      : typeof zones_allow === 'string'
      ? zones_allow.split(',').map(zone => zone.trim())
      : [];

    // Format zone_names similarly, if necessary
    const formattedZoneNames = Array.isArray(zone_names)
      ? zone_names
      : typeof zone_names === 'string'
      ? zone_names.split(',').map(zone => zone.trim())
      : [];

    if (!Array.isArray(formattedZones) || formattedZones.length === 0) {
      return res.status(400).json({ success: false, message: 'zones_allow must be a non-empty array or comma-separated string' });
    }

    const id = generatePassId();  // You can create a unique ID generation function

    // Create a new pass entry in the database
    const newPass = await VisitorPass.create({
      id,
      visit_purpose,
      whom_to_visit,
      visit_department,
      visitor_id,
      keey,
      zones_allow: formattedZones,
      zone_names: formattedZoneNames,  // Save zone_names array
     
      // created_at: created_at || new Date().toISOString(),
      valid_until,
      visitor  // Default visitor type
    });

    res.status(201).json({
      success: true,
      message: 'Visitor pass created successfully',
      data: newPass
    });

  } catch (err) {
    console.error('Error creating visitor pass:', err);
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getAllVisitorPasses = async (req, res) => {
  try {
    const passes = await VisitorPass.findAll();

    // Format zones_allow as array
    const formattedPasses = passes.map(pass => {
      let zones = [];

      if (Array.isArray(pass.zones_allow)) {
        zones = pass.zones_allow;
      } else if (typeof pass.zones_allow === 'string') {
        try {
          // Try parsing as JSON
          zones = JSON.parse(pass.zones_allow);
          if (!Array.isArray(zones)) {
            // If not array, fallback to comma split
            zones = pass.zones_allow.split(',').map(z => z.trim());
          }
        } catch (err) {
          // If not valid JSON, split by comma
          zones = pass.zones_allow.split(',').map(z => z.trim());
        }
      }

      return {
        ...pass.toJSON(),
        zones_allow: zones
      };
    });

    res.status(200).json({ success: true, data: formattedPasses });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.getVisitorPassById = async (req, res) => {
  try {
    const pass = await VisitorPass.findByPk(req.params.id);
    if (!pass) {
      return res.status(404).json({ success: false, message: 'Pass not found' });
    }

    let zones = [];

    if (Array.isArray(pass.zones_allow)) {
      zones = pass.zones_allow;
    } else if (typeof pass.zones_allow === 'string') {
      try {
        zones = JSON.parse(pass.zones_allow);
        if (!Array.isArray(zones)) {
          zones = pass.zones_allow.split(',').map(z => z.trim());
        }
      } catch {
        zones = pass.zones_allow.split(',').map(z => z.trim());
      }
    }

    const formattedPass = {
      ...pass.toJSON(),
      zones_allow: zones
    };

    res.status(200).json({ success: true, data: formattedPass });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


exports.updateVisitorPass = async (req, res) => {
  try {
    const [updated] = await VisitorPass.update(req.body, {
      where: { id: req.params.id }
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Pass not found' });
    }

    const updatedPass = await VisitorPass.findByPk(req.params.id);

    let zones = [];

    if (Array.isArray(updatedPass.zones_allow)) {
      zones = updatedPass.zones_allow;
    } else if (typeof updatedPass.zones_allow === 'string') {
      try {
        zones = JSON.parse(updatedPass.zones_allow);
        if (!Array.isArray(zones)) {
          zones = updatedPass.zones_allow.split(',').map(z => z.trim());
        }
      } catch {
        zones = updatedPass.zones_allow.split(',').map(z => z.trim());
      }
    }

    const formattedPass = {
      ...updatedPass.toJSON(),
      zones_allow: zones
    };

    res.status(200).json({
      success: true,
      message: 'Pass updated successfully',
      data: formattedPass
    });

  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};



exports.deleteVisitorPass = async (req, res) => {
  try {
    const deleted = await VisitorPass.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Pass not found' });
    res.status(200).json({ success: true, message: 'Pass deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
