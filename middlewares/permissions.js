exports.checkCoachOwnershipOrAdmin = async (req, res, next) => {
    const coach = await Coach.findById(req.params.id);
    if (!coach) {
      return res.status(404).json({ msg: 'Coach not found' });
    }
  
    // Check if the authenticated user is the coach or an admin
    if (req.user.id !== coach.user.toString() && req.user.type !== 'Admin') {
      return res.status(401).json({ msg: 'Not authorized to update this coach' });
    }
  
    next();
  };
  