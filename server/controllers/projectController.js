const { Project, User, ProjectMember, Task } = require('../models');

const createProject = async (req, res) => {
  const { name, description } = req.body;

  try {
    const project = await Project.create({ name, description });
    
    // Set the creator as the Admin
    await ProjectMember.create({
      UserId: req.user.id,
      ProjectId: project.id,
      role: 'admin'
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{
        model: Project,
        through: { attributes: ['role'] }
      }]
    });
    res.json(user.Projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        { model: User, through: { attributes: ['role'] } },
        { model: Task, include: [{ model: User, as: 'assignee', attributes: ['name', 'email'] }] }
      ]
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMember = async (req, res) => {
  const { email, role } = req.body;
  const { projectId } = req.params;

  try {
    const userToAdd = await User.findOne({ where: { email } });
    if (!userToAdd) {
      return res.status(404).json({ message: 'User not found' });
    }

    const membership = await ProjectMember.findOne({
      where: { ProjectId: projectId, UserId: userToAdd.id }
    });

    if (membership) {
      return res.status(400).json({ message: 'User is already a member' });
    }

    await ProjectMember.create({
      UserId: userToAdd.id,
      ProjectId: projectId,
      role: role || 'member'
    });

    res.status(200).json({ message: 'Member added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getProjects, getProjectById, addMember };
