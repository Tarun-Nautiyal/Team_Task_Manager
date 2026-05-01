const sequelize = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const ProjectMember = require('./ProjectMember');

// User <-> Project (Many-to-Many via ProjectMember)
User.belongsToMany(Project, { through: ProjectMember });
Project.belongsToMany(User, { through: ProjectMember });

// Project <-> Task (One-to-Many)
Project.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(Project);

// User <-> Task (One-to-Many - Assignee)
User.hasMany(Task, { foreignKey: 'assigneeId' });
Task.belongsTo(User, { as: 'assignee', foreignKey: 'assigneeId' });

module.exports = {
  sequelize,
  User,
  Project,
  Task,
  ProjectMember
};
