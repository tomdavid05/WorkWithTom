// Utility function to sort tasks based on different criteria
export const sortTasks = (tasks, sortBy) => {
  const tasksCopy = [...tasks];
  
  switch (sortBy) {
    case 'priority':
      return tasksCopy.sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      });
    
    case 'time':
      return tasksCopy.sort((a, b) => {
        // Sort by due date (earliest first)
        if (!a.due_date && !b.due_date) return 0;
        if (!a.due_date) return 1;
        if (!b.due_date) return -1;
        return new Date(a.due_date) - new Date(b.due_date);
      });
    
    case 'name':
      return tasksCopy.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    
    default:
      return tasksCopy;
  }
};

// Get sort option label
export const getSortOptionLabel = (sortBy) => {
  const labels = {
    priority: 'Mức độ ưu tiên',
    time: 'Thời gian',
    name: 'Tên nhiệm vụ'
  };
  return labels[sortBy] || 'Mặc định';
};

// Get sort option description
export const getSortOptionDescription = (sortBy) => {
  const descriptions = {
    priority: 'Sắp xếp theo độ ưu tiên (Cao → Thấp)',
    time: 'Sắp xếp theo thời gian đến hạn',
    name: 'Sắp xếp theo tên (A → Z)'
  };
  return descriptions[sortBy] || 'Sắp xếp mặc định';
}; 