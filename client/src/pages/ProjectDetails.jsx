import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import Layout from '../components/Layout';
import { 
  Plus, 
  MoreVertical, 
  Clock, 
  ChevronRight,
  UserPlus,
  Loader2
} from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'todo', priority: 'medium' });
  const [newMember, setNewMember] = useState({ email: '', role: 'member' });

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const { data } = await axios.get(`http://localhost:5001/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProject(data);
    } catch (error) {
      console.error('Error fetching project', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`http://localhost:5001/api/tasks/${id}`, newTask, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProject({ ...project, Tasks: [...project.Tasks, data] });
      setShowTaskModal(false);
      setNewTask({ title: '', description: '', status: 'todo', priority: 'medium' });
    } catch (error) {
      console.error('Error creating task', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, newStatus) => {
    try {
      const { data } = await axios.put(`http://localhost:5001/api/tasks/${taskId}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setProject({
        ...project,
        Tasks: project.Tasks.map(t => t.id === taskId ? data : t)
      });
    } catch (error) {
      console.error('Error updating task', error);
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5001/api/projects/${id}/members`, newMember, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setShowMemberModal(false);
      setNewMember({ email: '', role: 'member' });
      fetchProject();
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding member');
    }
  };

  if (loading) return (
    <Layout>
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    </Layout>
  );

  if (!project) return <Layout><div>Not found</div></Layout>;

  const columns = [
    { id: 'todo', title: 'To Do' },
    { id: 'in-progress', title: 'In Progress' },
    { id: 'done', title: 'Done' },
  ];

  return (
    <Layout>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
              <span className="hover:underline cursor-pointer" onClick={() => navigate('/dashboard')}>Dashboard</span>
              <ChevronRight size={12} />
              <span className="text-gray-900 font-medium">{project.name}</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1 mr-2">
              {project.Users?.map((u) => (
                <div key={u.id} className="w-8 h-8 rounded-full border border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-600 uppercase">
                  {u.name[0]}
                </div>
              ))}
              <button onClick={() => setShowMemberModal(true)} className="w-8 h-8 rounded-full border border-white bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200">
                <UserPlus size={14} />
              </button>
            </div>
            <button 
              onClick={() => setShowTaskModal(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors flex items-center gap-1.5"
            >
              <Plus size={16} />
              Task
            </button>
          </div>
        </div>

        {/* Board */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 overflow-hidden">
          {columns.map(column => (
            <div key={column.id} className="flex flex-col bg-gray-100/50 rounded-lg border border-gray-200 p-3">
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 px-1">{column.title}</h3>
              <div className="flex-1 overflow-y-auto space-y-3">
                {project.Tasks?.filter(t => t.status === column.id).map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-md border border-gray-200 shadow-sm hover:border-gray-300">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-bold text-gray-800">{task.title}</h4>
                      <select 
                        onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                        value={task.status}
                        className="text-[10px] bg-gray-50 border border-gray-200 rounded px-1 outline-none"
                      >
                        <option value="todo">Todo</option>
                        <option value="in-progress">Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                    <p className="text-gray-500 text-xs line-clamp-2 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                      <span className="flex items-center gap-1 text-[10px] text-gray-400">
                        <Clock size={10} />
                        {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No date'}
                      </span>
                      <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                        task.priority === 'high' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                      }`}>{task.priority}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showTaskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
          <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">New Task</h2>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Title</label>
                <input required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" value={newTask.title} onChange={(e) => setNewTask({...newTask, title: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Priority</label>
                  <select className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" value={newTask.priority} onChange={(e) => setNewTask({...newTask, priority: e.target.value})}>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Due Date</label>
                  <input type="date" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" value={newTask.dueDate} onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Description</label>
                <textarea className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm h-20 resize-none" value={newTask.description} onChange={(e) => setNewTask({...newTask, description: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowTaskModal(false)} className="flex-1 py-2 text-xs font-medium bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="flex-1 py-2 text-xs font-medium bg-blue-600 text-white rounded">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMemberModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20">
          <div className="bg-white w-full max-w-sm rounded-lg shadow-xl p-8 border border-gray-200">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Add Member</h2>
            <form onSubmit={handleAddMember} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                <input type="email" required className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded text-sm" value={newMember.email} onChange={(e) => setNewMember({...newMember, email: e.target.value})} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowMemberModal(false)} className="flex-1 py-2 text-xs font-medium bg-gray-100 rounded">Cancel</button>
                <button type="submit" className="flex-1 py-2 text-xs font-medium bg-blue-600 text-white rounded">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ProjectDetails;
