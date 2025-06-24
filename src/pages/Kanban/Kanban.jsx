// import React, {useContext, useState, useEffect} from 'react'
// import './Kanban.css'
// import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs'
// import ProviderSideNav from '../../components/ProviderSideNav/ProviderSideNav'
// import DashboardNav from '../../components/DashboardNav/DashboardNav'
// import { AuthContext } from '../../context/AuthContext'

// const Kanban = () => {
//   const { user } = useContext(AuthContext);
//   const token = localStorage.getItem('token');
    
//   const [firstName, setFirstName] = useState('');

//   useEffect(() => {
//     if (user) {
//       setFirstName(user.firstName || '');
//     }
//   }, [user, token]);

//     return (
//       <div className='dashboardBox'>
        
//         <ProviderSideNav/>
//         <div className='dashboardBody'>
//           <DashboardNav/>
//           <div className="dashboard">
//             <div className="welcome">
//               <div className="welcomeTxt">
//                 <h2>Welcome, {firstName}</h2>
//                 <p style={{color: "#888"}}>We are glad to see you again!</p>
//               </div>
//               <Breadcrumbs firstLink="Dashboard" link="/ProviderDashboard" secondLink="Home" link2="/ProviderDashboard/Kanban"/>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default Kanban


// import React, { useContext, useState, useEffect } from 'react';
// import { Plus, Calendar, Clock, X, MoreVertical, Edit2, Trash2 } from 'lucide-react';

// const Kanban = () => {
//   const [firstName, setFirstName] = useState('John');
//   const [showModal, setShowModal] = useState(false);
//   const [tasks, setTasks] = useState({
//     todo: [
//       {
//         id: 1,
//         title: 'Design new landing page',
//         reminderDate: '2025-06-25',
//         reminderTime: '10:00',
//         createdAt: new Date().toISOString(),
//       },
//       {
//         id: 2,
//         title: 'Review client feedback',
//         reminderDate: '2025-06-26',
//         reminderTime: '14:30',
//         createdAt: new Date().toISOString(),
//       }
//     ],
//     ongoing: [
//       {
//         id: 3,
//         title: 'Develop user authentication',
//         reminderDate: '2025-06-27',
//         reminderTime: '09:00',
//         createdAt: new Date().toISOString(),
//       }
//     ],
//     onhold: [
//       {
//         id: 4,
//         title: 'Database optimization',
//         reminderDate: '2025-06-28',
//         reminderTime: '16:00',
//         createdAt: new Date().toISOString(),
//       }
//     ],
//     completed: [
//       {
//         id: 5,
//         title: 'Setup project repository',
//         reminderDate: '2025-06-24',
//         reminderTime: '11:00',
//         createdAt: new Date().toISOString(),
//       }
//     ]
//   });
  
//   const [newTask, setNewTask] = useState({
//     title: '',
//     reminderDate: '',
//     reminderTime: ''
//   });

//   const columns = [
//     { id: 'todo', title: 'To Do', color: '#3b82f6', count: tasks.todo.length },
//     { id: 'ongoing', title: 'In Progress', color: '#f97316', count: tasks.ongoing.length },
//     { id: 'onhold', title: 'On Hold', color: '#eab308', count: tasks.onhold.length },
//     { id: 'completed', title: 'Completed', color: '#22c55e', count: tasks.completed.length }
//   ];

//   const handleCreateTask = () => {
//     if (newTask.title.trim()) {
//       const task = {
//         id: Date.now(),
//         title: newTask.title,
//         reminderDate: newTask.reminderDate,
//         reminderTime: newTask.reminderTime,
//         createdAt: new Date().toISOString(),
//       };
      
//       setTasks(prev => ({
//         ...prev,
//         todo: [...prev.todo, task]
//       }));
      
//       setNewTask({ title: '', reminderDate: '', reminderTime: '' });
//       setShowModal(false);
//     }
//   };

//   const handleDeleteTask = (taskId, columnId) => {
//     setTasks(prev => ({
//       ...prev,
//       [columnId]: prev[columnId].filter(task => task.id !== taskId)
//     }));
//   };

//   const moveTask = (taskId, fromColumn, toColumn) => {
//     const task = tasks[fromColumn].find(t => t.id === taskId);
//     if (task) {
//       setTasks(prev => ({
//         ...prev,
//         [fromColumn]: prev[fromColumn].filter(t => t.id !== taskId),
//         [toColumn]: [...prev[toColumn], task]
//       }));
//     }
//   };

//   const formatDate = (dateStr) => {
//     if (!dateStr) return '';
//     const date = new Date(dateStr);
//     return date.toLocaleDateString('en-US', { 
//       month: 'short', 
//       day: 'numeric' 
//     });
//   };

//   const TaskCard = ({ task, columnId }) => {
//     const [showActions, setShowActions] = useState(false);
    
//     return (
//       <div style={styles.taskCard}>
//         <div style={styles.taskHeader}>
//           <h3 style={styles.taskTitle}>{task.title}</h3>
//           <div style={styles.taskActionsContainer}>
//             <button
//               onClick={() => setShowActions(!showActions)}
//               style={styles.actionButton}
//             >
//               <MoreVertical size={14} />
//             </button>
//             {showActions && (
//               <div style={styles.actionsDropdown}>
//                 <button
//                   onClick={() => {
//                     if (columnId !== 'completed') moveTask(task.id, columnId, 'completed');
//                     setShowActions(false);
//                   }}
//                   style={styles.dropdownItem}
//                   disabled={columnId === 'completed'}
//                 >
//                   <Edit2 size={12} />
//                   Mark Complete
//                 </button>
//                 <button
//                   onClick={() => {
//                     handleDeleteTask(task.id, columnId);
//                     setShowActions(false);
//                   }}
//                   style={{...styles.dropdownItem, color: '#dc2626'}}
//                 >
//                   <Trash2 size={12} />
//                   Delete
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
        
//         {(task.reminderDate || task.reminderTime) && (
//           <div style={styles.taskMeta}>
//             {task.reminderDate && (
//               <div style={styles.metaItem}>
//                 <Calendar size={12} />
//                 <span>{formatDate(task.reminderDate)}</span>
//               </div>
//             )}
//             {task.reminderTime && (
//               <div style={styles.metaItem}>
//                 <Clock size={12} />
//                 <span>{task.reminderTime}</span>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#f9fafb',
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
//     },
//     header: {
//       backgroundColor: 'white',
//       borderBottom: '1px solid #e5e7eb',
//       padding: '1.5rem',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     headerContent: {
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     title: {
//       fontSize: '1.875rem',
//       fontWeight: 'bold',
//       color: '#111827',
//       margin: 0
//     },
//     subtitle: {
//       color: '#6b7280',
//       marginTop: '0.25rem',
//       margin: 0
//     },
//     createButton: {
//       backgroundColor: '#2563eb',
//       color: 'white',
//       padding: '0.75rem 1rem',
//       borderRadius: '0.5rem',
//       border: 'none',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem',
//       cursor: 'pointer',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
//       transition: 'background-color 0.2s'
//     },
//     boardContainer: {
//       padding: '1.5rem'
//     },
//     columnsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '1.5rem'
//     },
//     column: {
//       backgroundColor: '#f3f4f6',
//       borderRadius: '1rem',
//       padding: '1rem',
//       minHeight: '400px'
//     },
//     columnHeader: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       marginBottom: '1rem'
//     },
//     columnTitle: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.75rem'
//     },
//     columnIndicator: {
//       width: '12px',
//       height: '12px',
//       borderRadius: '50%'
//     },
//     columnText: {
//       fontWeight: '600',
//       color: '#374151',
//       margin: 0
//     },
//     columnCount: {
//       backgroundColor: '#d1d5db',
//       color: '#6b7280',
//       padding: '0.25rem 0.5rem',
//       borderRadius: '9999px',
//       fontSize: '0.75rem',
//       fontWeight: '500'
//     },
//     tasksContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '0.75rem'
//     },
//     taskCard: {
//       backgroundColor: 'white',
//       borderRadius: '0.75rem',
//       padding: '1rem',
//       boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//       border: '1px solid #f3f4f6',
//       transition: 'all 0.2s',
//       cursor: 'pointer'
//     },
//     taskHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'flex-start',
//       marginBottom: '0.75rem'
//     },
//     taskTitle: {
//       fontWeight: '500',
//       color: '#111827',
//       fontSize: '0.875rem',
//       lineHeight: '1.25rem',
//       margin: 0
//     },
//     taskActionsContainer: {
//       position: 'relative'
//     },
//     actionButton: {
//       opacity: '0.6',
//       padding: '0.25rem',
//       backgroundColor: 'transparent',
//       border: 'none',
//       borderRadius: '0.375rem',
//       cursor: 'pointer',
//       color: '#9ca3af',
//       transition: 'all 0.2s'
//     },
//     actionsDropdown: {
//       position: 'absolute',
//       right: 0,
//       top: '2rem',
//       backgroundColor: 'white',
//       border: '1px solid #e5e7eb',
//       borderRadius: '0.5rem',
//       boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//       padding: '0.25rem 0',
//       zIndex: 10,
//       minWidth: '140px'
//     },
//     dropdownItem: {
//       width: '100%',
//       padding: '0.5rem 0.75rem',
//       textAlign: 'left',
//       fontSize: '0.875rem',
//       color: '#374151',
//       backgroundColor: 'transparent',
//       border: 'none',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.5rem'
//     },
//     taskMeta: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '1rem',
//       fontSize: '0.75rem',
//       color: '#6b7280'
//     },
//     metaItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '0.25rem'
//     },
//     emptyState: {
//       textAlign: 'center',
//       padding: '3rem 0',
//       color: '#9ca3af'
//     },
//     emptyIcon: {
//       width: '3rem',
//       height: '3rem',
//       margin: '0 auto 0.75rem',
//       backgroundColor: '#e5e7eb',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     emptyText: {
//       fontSize: '0.875rem',
//       margin: 0
//     },
//     modalOverlay: {
//       position: 'fixed',
//       inset: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       zIndex: 50,
//       padding: '1rem'
//     },
//     modal: {
//       backgroundColor: 'white',
//       borderRadius: '1rem',
//       padding: '1.5rem',
//       width: '100%',
//       maxWidth: '28rem'
//     },
//     modalHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '1.5rem'
//     },
//     modalTitle: {
//       fontSize: '1.25rem',
//       fontWeight: 'bold',
//       color: '#111827',
//       margin: 0
//     },
//     closeButton: {
//       padding: '0.5rem',
//       backgroundColor: 'transparent',
//       border: 'none',
//       borderRadius: '0.5rem',
//       cursor: 'pointer',
//       color: '#6b7280',
//       transition: 'background-color 0.2s'
//     },
//     formContainer: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '1rem'
//     },
//     formGroup: {
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     formRow: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '1rem'
//     },
//     label: {
//       display: 'block',
//       fontSize: '0.875rem',
//       fontWeight: '500',
//       color: '#374151',
//       marginBottom: '0.5rem'
//     },
//     input: {
//       width: '100%',
//       padding: '0.75rem 1rem',
//       border: '1px solid #d1d5db',
//       borderRadius: '0.5rem',
//       fontSize: '0.875rem',
//       outline: 'none',
//       transition: 'all 0.2s',
//       boxSizing: 'border-box'
//     },
//     buttonRow: {
//       display: 'flex',
//       gap: '0.75rem',
//       marginTop: '1.5rem'
//     },
//     cancelButton: {
//       flex: 1,
//       padding: '0.75rem 1rem',
//       border: '1px solid #d1d5db',
//       color: '#374151',
//       borderRadius: '0.5rem',
//       backgroundColor: 'white',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'background-color 0.2s'
//     },
//     submitButton: {
//       flex: 1,
//       padding: '0.75rem 1rem',
//       backgroundColor: '#2563eb',
//       color: 'white',
//       borderRadius: '0.5rem',
//       border: 'none',
//       cursor: 'pointer',
//       fontWeight: '500',
//       transition: 'background-color 0.2s'
//     },
//     submitButtonDisabled: {
//       backgroundColor: '#d1d5db',
//       cursor: 'not-allowed'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div style={styles.headerContent}>
//           <h1 style={styles.title}>Welcome, {firstName}</h1>
//           <p style={styles.subtitle}>We are glad to see you again!</p>
//         </div>
//         <button
//           onClick={() => setShowModal(true)}
//           style={styles.createButton}
//           onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
//           onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
//         >
//           <Plus size={20} />
//           Create Task
//         </button>
//       </div>

//       {/* Kanban Board */}
//       <div style={styles.boardContainer}>
//         <div style={styles.columnsGrid}>
//           {columns.map((column) => (
//             <div key={column.id} style={styles.column}>
//               <div style={styles.columnHeader}>
//                 <div style={styles.columnTitle}>
//                   <div style={{...styles.columnIndicator, backgroundColor: column.color}}></div>
//                   <h2 style={styles.columnText}>{column.title}</h2>
//                 </div>
//                 <span style={styles.columnCount}>
//                   {column.count}
//                 </span>
//               </div>
              
//               <div style={styles.tasksContainer}>
//                 {tasks[column.id].map((task) => (
//                   <TaskCard key={task.id} task={task} columnId={column.id} />
//                 ))}
//               </div>
              
//               {tasks[column.id].length === 0 && (
//                 <div style={styles.emptyState}>
//                   <div style={styles.emptyIcon}>
//                     <Plus size={20} />
//                   </div>
//                   <p style={styles.emptyText}>No tasks yet</p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Create Task Modal */}
//       {showModal && (
//         <div style={styles.modalOverlay}>
//           <div style={styles.modal}>
//             <div style={styles.modalHeader}>
//               <h2 style={styles.modalTitle}>Create New Task</h2>
//               <button
//                 onClick={() => setShowModal(false)}
//                 style={styles.closeButton}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
//               >
//                 <X size={20} />
//               </button>
//             </div>
            
//             <div style={styles.formContainer}>
//               <div style={styles.formGroup}>
//                 <label style={styles.label}>
//                   Task Title *
//                 </label>
//                 <input
//                   type="text"
//                   value={newTask.title}
//                   onChange={(e) => setNewTask(prev => ({ ...prev, title: e.target.value }))}
//                   placeholder="Enter task title"
//                   style={styles.input}
//                   onFocus={(e) => {
//                     e.target.style.borderColor = '#2563eb';
//                     e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
//                   }}
//                   onBlur={(e) => {
//                     e.target.style.borderColor = '#d1d5db';
//                     e.target.style.boxShadow = 'none';
//                   }}
//                 />
//               </div>
              
//               <div style={styles.formRow}>
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>
//                     Reminder Date
//                   </label>
//                   <input
//                     type="date"
//                     value={newTask.reminderDate}
//                     onChange={(e) => setNewTask(prev => ({ ...prev, reminderDate: e.target.value }))}
//                     style={styles.input}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#2563eb';
//                       e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = '#d1d5db';
//                       e.target.style.boxShadow = 'none';
//                     }}
//                   />
//                 </div>
                
//                 <div style={styles.formGroup}>
//                   <label style={styles.label}>
//                     Reminder Time
//                   </label>
//                   <input
//                     type="time"
//                     value={newTask.reminderTime}
//                     onChange={(e) => setNewTask(prev => ({ ...prev, reminderTime: e.target.value }))}
//                     style={styles.input}
//                     onFocus={(e) => {
//                       e.target.style.borderColor = '#2563eb';
//                       e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
//                     }}
//                     onBlur={(e) => {
//                       e.target.style.borderColor = '#d1d5db';
//                       e.target.style.boxShadow = 'none';
//                     }}
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div style={styles.buttonRow}>
//               <button
//                 onClick={() => setShowModal(false)}
//                 style={styles.cancelButton}
//                 onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
//                 onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleCreateTask}
//                 disabled={!newTask.title.trim()}
//                 style={{
//                   ...styles.submitButton,
//                   ...(newTask.title.trim() ? {} : styles.submitButtonDisabled)
//                 }}
//                 onMouseEnter={(e) => {
//                   if (newTask.title.trim()) {
//                     e.target.style.backgroundColor = '#1d4ed8';
//                   }
//                 }}
//                 onMouseLeave={(e) => {
//                   if (newTask.title.trim()) {
//                     e.target.style.backgroundColor = '#2563eb';
//                   }
//                 }}
//               >
//                 Create Task
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Kanban;




import React, { useContext, useState, useEffect } from 'react';
import { Plus, Calendar, Clock, X, MoreVertical, Edit2, Trash2 } from 'lucide-react';

const Kanban = () => {
  const [firstName, setFirstName] = useState('John');
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [draggedFrom, setDraggedFrom] = useState(null);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  
  const [tasks, setTasks] = useState({
    todo: [
      {
        id: 1,
        title: 'Design new landing page',
        reminderDate: '2025-06-25',
        reminderTime: '10:00',
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        title: 'Review client feedback',
        reminderDate: '2025-06-26',
        reminderTime: '14:30',
        createdAt: new Date().toISOString(),
      }
    ],
    ongoing: [
      {
        id: 3,
        title: 'Develop user authentication',
        reminderDate: '2025-06-27',
        reminderTime: '09:00',
        createdAt: new Date().toISOString(),
      }
    ],
    onhold: [
      {
        id: 4,
        title: 'Database optimization',
        reminderDate: '2025-06-28',
        reminderTime: '16:00',
        createdAt: new Date().toISOString(),
      }
    ],
    completed: [
      {
        id: 5,
        title: 'Setup project repository',
        reminderDate: '2025-06-24',
        reminderTime: '11:00',
        createdAt: new Date().toISOString(),
      }
    ]
  });
  
  const [taskForm, setTaskForm] = useState({
    title: '',
    reminderDate: '',
    reminderTime: ''
  });

  const columns = [
    { id: 'todo', title: 'To Do', color: '#3b82f6', count: tasks.todo.length },
    { id: 'ongoing', title: 'In Progress', color: '#f97316', count: tasks.ongoing.length },
    { id: 'onhold', title: 'On Hold', color: '#eab308', count: tasks.onhold.length },
    { id: 'completed', title: 'Completed', color: '#22c55e', count: tasks.completed.length }
  ];

  const openCreateModal = () => {
    setEditingTask(null);
    setTaskForm({ title: '', reminderDate: '', reminderTime: '' });
    setShowModal(true);
  };

  const openEditModal = (task, columnId) => {
    setEditingTask({ ...task, columnId });
    setTaskForm({
      title: task.title,
      reminderDate: task.reminderDate,
      reminderTime: task.reminderTime
    });
    setShowModal(true);
  };

  const handleSubmitTask = () => {
    if (taskForm.title.trim()) {
      if (editingTask) {
        // Update existing task
        setTasks(prev => ({
          ...prev,
          [editingTask.columnId]: prev[editingTask.columnId].map(task =>
            task.id === editingTask.id
              ? { ...task, ...taskForm }
              : task
          )
        }));
      } else {
        // Create new task
        const task = {
          id: Date.now(),
          title: taskForm.title,
          reminderDate: taskForm.reminderDate,
          reminderTime: taskForm.reminderTime,
          createdAt: new Date().toISOString(),
        };
        
        setTasks(prev => ({
          ...prev,
          todo: [...prev.todo, task]
        }));
      }
      
      setTaskForm({ title: '', reminderDate: '', reminderTime: '' });
      setEditingTask(null);
      setShowModal(false);
    }
  };

  const handleDeleteTask = (taskId, columnId) => {
    setTasks(prev => ({
      ...prev,
      [columnId]: prev[columnId].filter(task => task.id !== taskId)
    }));
  };

  const moveTask = (taskId, fromColumn, toColumn) => {
    const task = tasks[fromColumn].find(t => t.id === taskId);
    if (task) {
      setTasks(prev => ({
        ...prev,
        [fromColumn]: prev[fromColumn].filter(t => t.id !== taskId),
        [toColumn]: [...prev[toColumn], task]
      }));
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (e, task, columnId) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDragEnter = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDragLeave = (e) => {
    // Only remove drag over effect if leaving the column entirely
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDragOverColumn(null);
    }
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    if (draggedTask && draggedFrom && draggedFrom !== columnId) {
      moveTask(draggedTask.id, draggedFrom, columnId);
    }
    setDraggedTask(null);
    setDraggedFrom(null);
    setDragOverColumn(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setDraggedFrom(null);
    setDragOverColumn(null);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const TaskCard = ({ task, columnId }) => {
    const [showActions, setShowActions] = useState(false);
    const isDragging = draggedTask && draggedTask.id === task.id;
    
    return (
      <div 
        style={{
          ...styles.taskCard,
          opacity: isDragging ? 0.5 : 1,
          transform: isDragging ? 'rotate(5deg)' : 'none'
        }}
        draggable
        onDragStart={(e) => handleDragStart(e, task, columnId)}
        onDragEnd={handleDragEnd}
      >
        <div style={styles.taskHeader}>
          <h3 style={styles.taskTitle}>{task.title}</h3>
          <div style={styles.taskActionsContainer}>
            <button
              onClick={() => setShowActions(!showActions)}
              style={styles.actionButton}
            >
              <MoreVertical size={14} />
            </button>
            {showActions && (
              <div style={styles.actionsDropdown}>
                <button
                  onClick={() => {
                    openEditModal(task, columnId);
                    setShowActions(false);
                  }}
                  style={styles.dropdownItem}
                >
                  <Edit2 size={12} />
                  Edit Task
                </button>
                <button
                  onClick={() => {
                    if (columnId !== 'completed') moveTask(task.id, columnId, 'completed');
                    setShowActions(false);
                  }}
                  style={styles.dropdownItem}
                  disabled={columnId === 'completed'}
                >
                  <Calendar size={12} />
                  Mark Complete
                </button>
                <button
                  onClick={() => {
                    handleDeleteTask(task.id, columnId);
                    setShowActions(false);
                  }}
                  style={{...styles.dropdownItem, color: '#dc2626'}}
                >
                  <Trash2 size={12} />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
        
        {(task.reminderDate || task.reminderTime) && (
          <div style={styles.taskMeta}>
            {task.reminderDate && (
              <div style={styles.metaItem}>
                <Calendar size={12} />
                <span>{formatDate(task.reminderDate)}</span>
              </div>
            )}
            {task.reminderTime && (
              <div style={styles.metaItem}>
                <Clock size={12} />
                <span>{task.reminderTime}</span>
              </div>
            )}
          </div>
        )}
        
        <div style={styles.dragHandle}>
          <div style={styles.dragIndicator}>⋮⋮</div>
        </div>
      </div>
    );
  };

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#f9fafb',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
    },
    header: {
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '1.5rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerContent: {
      display: 'flex',
      flexDirection: 'column'
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0
    },
    subtitle: {
      color: '#6b7280',
      marginTop: '0.25rem',
      margin: 0
    },
    createButton: {
      backgroundColor: '#2563eb',
      color: 'white',
      padding: '0.75rem 1rem',
      borderRadius: '0.5rem',
      border: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      cursor: 'pointer',
      fontSize: '0.875rem',
      fontWeight: '500',
      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      transition: 'background-color 0.2s'
    },
    boardContainer: {
      padding: '1.5rem'
    },
    columnsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem'
    },
    column: {
      backgroundColor: '#f3f4f6',
      borderRadius: '1rem',
      padding: '1rem',
      minHeight: '400px',
      transition: 'all 0.2s'
    },
    columnDragOver: {
      backgroundColor: '#e0f2fe',
      boxShadow: '0 0 0 2px #0ea5e9',
      transform: 'scale(1.02)'
    },
    columnHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    columnTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    columnIndicator: {
      width: '12px',
      height: '12px',
      borderRadius: '50%'
    },
    columnText: {
      fontWeight: '600',
      color: '#374151',
      margin: 0
    },
    columnCount: {
      backgroundColor: '#d1d5db',
      color: '#6b7280',
      padding: '0.25rem 0.5rem',
      borderRadius: '9999px',
      fontSize: '0.75rem',
      fontWeight: '500'
    },
    tasksContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      minHeight: '300px'
    },
    taskCard: {
      backgroundColor: 'white',
      borderRadius: '0.75rem',
      padding: '1rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      border: '1px solid #f3f4f6',
      transition: 'all 0.2s',
      cursor: 'grab',
      position: 'relative'
    },
    taskHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '0.75rem'
    },
    taskTitle: {
      fontWeight: '500',
      color: '#111827',
      fontSize: '0.875rem',
      lineHeight: '1.25rem',
      margin: 0,
      paddingRight: '1rem'
    },
    taskActionsContainer: {
      position: 'relative'
    },
    actionButton: {
      opacity: '0.6',
      padding: '0.25rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0.375rem',
      cursor: 'pointer',
      color: '#9ca3af',
      transition: 'all 0.2s'
    },
    actionsDropdown: {
      position: 'absolute',
      right: 0,
      top: '2rem',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      padding: '0.25rem 0',
      zIndex: 10,
      minWidth: '140px'
    },
    dropdownItem: {
      width: '100%',
      padding: '0.5rem 0.75rem',
      textAlign: 'left',
      fontSize: '0.875rem',
      color: '#374151',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    taskMeta: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem',
      fontSize: '0.75rem',
      color: '#6b7280',
      marginBottom: '0.5rem'
    },
    metaItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.25rem'
    },
    dragHandle: {
      position: 'absolute',
      right: '0.5rem',
      bottom: '0.5rem',
      opacity: '0.3'
    },
    dragIndicator: {
      fontSize: '0.75rem',
      color: '#9ca3af',
      userSelect: 'none'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem 0',
      color: '#9ca3af'
    },
    emptyIcon: {
      width: '3rem',
      height: '3rem',
      margin: '0 auto 0.75rem',
      backgroundColor: '#e5e7eb',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    emptyText: {
      fontSize: '0.875rem',
      margin: 0
    },
    modalOverlay: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
      padding: '1rem'
    },
    modal: {
      backgroundColor: 'white',
      borderRadius: '1rem',
      padding: '1.5rem',
      width: '100%',
      maxWidth: '28rem'
    },
    modalHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '1.5rem'
    },
    modalTitle: {
      fontSize: '1.25rem',
      fontWeight: 'bold',
      color: '#111827',
      margin: 0
    },
    closeButton: {
      padding: '0.5rem',
      backgroundColor: 'transparent',
      border: 'none',
      borderRadius: '0.5rem',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'background-color 0.2s'
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column'
    },
    formRow: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '1rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#374151',
      marginBottom: '0.5rem'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      borderRadius: '0.5rem',
      fontSize: '0.875rem',
      outline: 'none',
      transition: 'all 0.2s',
      boxSizing: 'border-box'
    },
    buttonRow: {
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1.5rem'
    },
    cancelButton: {
      flex: 1,
      padding: '0.75rem 1rem',
      border: '1px solid #d1d5db',
      color: '#374151',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    submitButton: {
      flex: 1,
      padding: '0.75rem 1rem',
      backgroundColor: '#2563eb',
      color: 'white',
      borderRadius: '0.5rem',
      border: 'none',
      cursor: 'pointer',
      fontWeight: '500',
      transition: 'background-color 0.2s'
    },
    submitButtonDisabled: {
      backgroundColor: '#d1d5db',
      cursor: 'not-allowed'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.title}>Welcome, {firstName}</h1>
          <p style={styles.subtitle}>We are glad to see you again!</p>
        </div>
        <button
          onClick={openCreateModal}
          style={styles.createButton}
          onMouseEnter={(e) => e.target.style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => e.target.style.backgroundColor = '#2563eb'}
        >
          <Plus size={20} />
          Create Task
        </button>
      </div>

      {/* Kanban Board */}
      <div style={styles.boardContainer}>
        <div style={styles.columnsGrid}>
          {columns.map((column) => (
            <div 
              key={column.id} 
              style={{
                ...styles.column,
                ...(dragOverColumn === column.id ? styles.columnDragOver : {})
              }}
              onDragOver={handleDragOver}
              onDragEnter={(e) => handleDragEnter(e, column.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <div style={styles.columnHeader}>
                <div style={styles.columnTitle}>
                  <div style={{...styles.columnIndicator, backgroundColor: column.color}}></div>
                  <h2 style={styles.columnText}>{column.title}</h2>
                </div>
                <span style={styles.columnCount}>
                  {column.count}
                </span>
              </div>
              
              <div style={styles.tasksContainer}>
                {tasks[column.id].map((task) => (
                  <TaskCard key={task.id} task={task} columnId={column.id} />
                ))}
              </div>
              
              {tasks[column.id].length === 0 && (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>
                    <Plus size={20} />
                  </div>
                  <p style={styles.emptyText}>Drop tasks here</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Create/Edit Task Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={styles.closeButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>
            
            <div style={styles.formContainer}>
              <div style={styles.formGroup}>
                <label style={styles.label}>
                  Task Title *
                </label>
                <input
                  type="text"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter task title"
                  style={styles.input}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#2563eb';
                    e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#d1d5db';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
              
              <div style={styles.formRow}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Reminder Date
                  </label>
                  <input
                    type="date"
                    value={taskForm.reminderDate}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, reminderDate: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
                
                <div style={styles.formGroup}>
                  <label style={styles.label}>
                    Reminder Time
                  </label>
                  <input
                    type="time"
                    value={taskForm.reminderTime}
                    onChange={(e) => setTaskForm(prev => ({ ...prev, reminderTime: e.target.value }))}
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#2563eb';
                      e.target.style.boxShadow = '0 0 0 3px rgba(37, 99, 235, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>
            </div>
            
            <div style={styles.buttonRow}>
              <button
                onClick={() => setShowModal(false)}
                style={styles.cancelButton}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitTask}
                disabled={!taskForm.title.trim()}
                style={{
                  ...styles.submitButton,
                  ...(taskForm.title.trim() ? {} : styles.submitButtonDisabled)
                }}
                onMouseEnter={(e) => {
                  if (taskForm.title.trim()) {
                    e.target.style.backgroundColor = '#1d4ed8';
                  }
                }}
                onMouseLeave={(e) => {
                  if (taskForm.title.trim()) {
                    e.target.style.backgroundColor = '#2563eb';
                  }
                }}
              >
                {editingTask ? 'Update Task' : 'Create Task'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Kanban;