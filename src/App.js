import React, { useState } from 'react';
import { Menu, X, LogOut, Plus, Edit2, Trash2, BarChart3, Users, Package, Briefcase, TrendingUp } from 'lucide-react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const [jobs, setJobs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [containers, setContainers] = useState([]);
  const [accounts, setAccounts] = useState([]);
  
  const [showJobModal, setShowJobModal] = useState(false);
  const [showContainerModal, setShowContainerModal] = useState(false);
  const [showCustomerModal, setShowCustomerModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'admin@atlanticgateway.com' && loginPassword === 'admin123') {
      setCurrentUser({ id: '1', email: 'admin@atlanticgateway.com', role: 'admin', name: 'Admin User' });
      setLoginEmail('');
      setLoginPassword('');
    } else if (loginEmail === 'staff@atlanticgateway.com' && loginPassword === 'staff123') {
      setCurrentUser({ id: '2', email: 'staff@atlanticgateway.com', role: 'staff', name: 'Staff User' });
      setLoginEmail('');
      setLoginPassword('');
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setActiveTab('dashboard');
  };

  const [jobForm, setJobForm] = useState({
    jobId: '',
    jobName: '',
    status: 'active',
    containers: [],
    customer: '',
  });

  const handleAddJob = () => {
    if (jobForm.jobId && jobForm.jobName) {
      if (editingItem) {
        setJobs(jobs.map(j => j.jobId === editingItem.jobId ? { ...jobForm } : j));
        setEditingItem(null);
      } else {
        setJobs([...jobs, jobForm]);
      }
      setJobForm({ jobId: '', jobName: '', status: 'active', containers: [], customer: '' });
      setShowJobModal(false);
    }
  };

  const [containerForm, setContainerForm] = useState({
    containerId: '',
    containerName: '',
    size: '20ft',
    type: 'standard',
    status: 'active',
    inUseStatus: 'available',
    importVessel: '',
    eta: '',
    pol: '',
    pod: '',
    freeDays: 0,
    blNumber: '',
    dischargeDate: '',
    doIssueDate: '',
    gateOutDate: '',
    emptyReturnDate: '',
    importCountry: '',
    currentLocation: '',
    agent: '',
    remarks: ''
  });

  const calculateReturnDays = (gateOutDate, returnDate) => {
    if (!gateOutDate || !returnDate) return null;
    const out = new Date(gateOutDate);
    const returned = new Date(returnDate);
    const days = Math.ceil((returned - out) / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const handleAddContainer = () => {
    if (containerForm.containerId && containerForm.containerName) {
      if (editingItem) {
        setContainers(containers.map(c => c.containerId === editingItem.containerId ? { ...containerForm } : c));
        setEditingItem(null);
      } else {
        setContainers([...containers, containerForm]);
      }
      setContainerForm({
        containerId: '',
        containerName: '',
        size: '20ft',
        type: 'standard',
        status: 'active',
        inUseStatus: 'available',
        importVessel: '',
        eta: '',
        pol: '',
        pod: '',
        freeDays: 0,
        blNumber: '',
        dischargeDate: '',
        doIssueDate: '',
        gateOutDate: '',
        emptyReturnDate: '',
        importCountry: '',
        currentLocation: '',
        agent: '',
        remarks: ''
      });
      setShowContainerModal(false);
    }
  };

  const [customerForm, setCustomerForm] = useState({
    customerId: '',
    customerName: '',
    email: '',
    phone: '',
    address: '',
    country: ''
  });

  const handleAddCustomer = () => {
    if (customerForm.customerId && customerForm.customerName) {
      if (editingItem) {
        setCustomers(customers.map(c => c.customerId === editingItem.customerId ? { ...customerForm } : c));
        setEditingItem(null);
      } else {
        setCustomers([...customers, customerForm]);
      }
      setCustomerForm({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
      setShowCustomerModal(false);
    }
  };

  const [leadForm, setLeadForm] = useState({
    leadId: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    status: 'new',
    value: ''
  });

  const handleAddLead = () => {
    if (leadForm.leadId && leadForm.companyName) {
      if (editingItem) {
        setLeads(leads.map(l => l.leadId === editingItem.leadId ? { ...leadForm } : l));
        setEditingItem(null);
      } else {
        setLeads([...leads, leadForm]);
      }
      setLeadForm({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
      setShowLeadModal(false);
    }
  };

  const [accountForm, setAccountForm] = useState({
    accountId: '',
    accountName: '',
    customer: '',
    balance: 0,
    status: 'active'
  });

  const handleAddAccount = () => {
    if (accountForm.accountId && accountForm.accountName) {
      if (editingItem) {
        setAccounts(accounts.map(a => a.accountId === editingItem.accountId ? { ...accountForm } : a));
        setEditingItem(null);
      } else {
        setAccounts([...accounts, accountForm]);
      }
      setAccountForm({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });
      setShowAccountModal(false);
    }
  };

  const handleEditItem = (item, type) => {
    setEditingItem(item);
    if (type === 'job') {
      setJobForm(item);
      setShowJobModal(true);
    } else if (type === 'container') {
      setContainerForm(item);
      setShowContainerModal(true);
    } else if (type === 'customer') {
      setCustomerForm(item);
      setShowCustomerModal(true);
    } else if (type === 'lead') {
      setLeadForm(item);
      setShowLeadModal(true);
    } else if (type === 'account') {
      setAccountForm(item);
      setShowAccountModal(true);
    }
  };

  const handleDeleteItem = (id, type) => {
    if (type === 'job') setJobs(jobs.filter(j => j.jobId !== id));
    else if (type === 'container') setContainers(containers.filter(c => c.containerId !== id));
    else if (type === 'customer') setCustomers(customers.filter(c => c.customerId !== id));
    else if (type === 'lead') setLeads(leads.filter(l => l.leadId !== id));
    else if (type === 'account') setAccounts(accounts.filter(a => a.accountId !== id));
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-slate-700 rounded-lg shadow-2xl p-8 border border-slate-600">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Atlantic Gateway</h1>
            <p className="text-slate-300">Shipping & Logistics CRM</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-slate-200 text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                placeholder="admin@atlanticgateway.com"
              />
            </div>
            <div>
              <label className="block text-slate-200 text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-4 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition"
            >
              Login
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-600">
            <p className="text-slate-300 text-sm mb-2"><strong>Demo Credentials:</strong></p>
            <p className="text-slate-400 text-xs mb-1">Admin: admin@atlanticgateway.com / admin123</p>
            <p className="text-slate-400 text-xs">Staff: staff@atlanticgateway.com / staff123</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-900">
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-slate-800 border-r border-slate-700 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-slate-700 flex items-center justify-between">
          {sidebarOpen && <h2 className="text-white font-bold">AG CRM</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-400 hover:text-white">
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'jobs', label: 'Jobs', icon: Briefcase },
            { id: 'containers', label: 'Inventory', icon: Package },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'leads', label: 'Active Leads', icon: TrendingUp },
            { id: 'accounts', label: 'Accounts', icon: BarChart3 }
          ].map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-2 rounded transition ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-2 rounded text-slate-300 hover:bg-slate-700 transition"
          >
            <LogOut size={20} />
            {sidebarOpen && <span>Logout</span>}
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-slate-800 border-b border-slate-700 p-6 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'jobs' && 'Job Tracking'}
              {activeTab === 'containers' && 'Container Inventory'}
              {activeTab === 'customers' && 'Customers'}
              {activeTab === 'leads' && 'Active Leads'}
              {activeTab === 'accounts' && 'Accounts'}
            </h1>
            <div className="text-slate-300">
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm capitalize text-slate-400">{currentUser.role}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'dashboard' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Jobs</p>
                    <p className="text-3xl font-bold text-white">{jobs.length}</p>
                  </div>
                  <Briefcase size={40} className="text-blue-400" />
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Containers</p>
                    <p className="text-3xl font-bold text-white">{containers.length}</p>
                  </div>
                  <Package size={40} className="text-green-400" />
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Customers</p>
                    <p className="text-3xl font-bold text-white">{customers.length}</p>
                  </div>
                  <Users size={40} className="text-purple-400" />
                </div>
              </div>
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Active Leads</p>
                    <p className="text-3xl font-bold text-white">{leads.length}</p>
                  </div>
                  <TrendingUp size={40} className="text-orange-400" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setJobForm({ jobId: '', jobName: '', status: 'active', containers: [], customer: '' });
                  setShowJobModal(true);
                }}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition"
              >
                <Plus size={20} />
                <span>Add Job</span>
              </button>

              <div className="grid gap-4">
                {jobs.length === 0 ? (
                  <p className="text-slate-400">No jobs yet. Create your first job to get started.</p>
                ) : (
                  jobs.map(job => (
                    <div key={job.jobId} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{job.jobName}</h3>
                          <p className="text-slate-400 text-sm">Job ID: {job.jobId}</p>
                        </div>
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${job.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-slate-400">Customer</p>
                          <p className="text-white">{job.customer || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Containers</p>
                          <p className="text-white">{job.containers.length}</p>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(job, 'job')}
                          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteItem(job.jobId, 'job')}
                            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {showJobModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">{editingItem ? 'Edit Job' : 'Add New Job'}</h2>
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Job ID"
                        value={jobForm.jobId}
                        onChange={(e) => setJobForm({...jobForm, jobId: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Job Name"
                        value={jobForm.jobName}
                        onChange={(e) => setJobForm({...jobForm, jobName: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                      />
                      <input
                        type="text"
                        placeholder="Customer"
                        value={jobForm.customer}
                        onChange={(e) => setJobForm({...jobForm, customer: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400"
                      />
                      <select
                        value={jobForm.status}
                        onChange={(e) => setJobForm({...jobForm, status: e.target.value})}
                        className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <div className="flex space-x-2">
                        <button
                          onClick={handleAddJob}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
                        >
                          {editingItem ? 'Update' : 'Create'}
                        </button>
                        <button
                          onClick={() => setShowJobModal(false)}
                          className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'containers' && (
            <div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setContainerForm({
                    containerId: '',
                    containerName: '',
                    size: '20ft',
                    type: 'standard',
                    status: 'active',
                    inUseStatus: 'available',
                    importVessel: '',
                    eta: '',
                    pol: '',
                    pod: '',
                    freeDays: 0,
                    blNumber: '',
                    dischargeDate: '',
                    doIssueDate: '',
                    gateOutDate: '',
                    emptyReturnDate: '',
                    importCountry: '',
                    currentLocation: '',
                    agent: '',
                    remarks: ''
                  });
                  setShowContainerModal(true);
                }}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition"
              >
                <Plus size={20} />
                <span>Add Container</span>
              </button>

              <div className="grid gap-4">
                {containers.length === 0 ? (
                  <p className="text-slate-400">No containers yet. Add your first container to start tracking.</p>
                ) : (
                  containers.map(container => (
                    <div key={container.containerId} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{container.containerName}</h3>
                          <p className="text-slate-400 text-sm">Container ID: {container.containerId}</p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <span className={`px-3 py-1 rounded text-sm font-semibold text-center ${container.status === 'active' ? 'bg-green-900 text-green-200' : 'bg-red-900 text-red-200'}`}>
                            {container.status}
                          </span>
                          <span className={`px-3 py-1 rounded text-sm font-semibold text-center ${container.inUseStatus === 'available' ? 'bg-blue-900 text-blue-200' : 'bg-yellow-900 text-yellow-200'}`}>
                            {container.inUseStatus}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-slate-400">Size</p>
                          <p className="text-white">{container.size}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Type</p>
                          <p className="text-white">{container.type}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">POL</p>
                          <p className="text-white">{container.pol || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">POD</p>
                          <p className="text-white">{container.pod || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Current Location</p>
                          <p className="text-white">{container.currentLocation || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Agent</p>
                          <p className="text-white">{container.agent || 'N/A'}</p>
                        </div>
                      </div>
                      {container.emptyReturnDate && container.gateOutDate && (
                        <div className="bg-blue-900 bg-opacity-30 border border-blue-700 rounded p-3 mb-4">
                          <p className="text-blue-200 text-sm">
                            <strong>Days After Free Period:</strong> {calculateReturnDays(container.gateOutDate, container.emptyReturnDate)} days
                          </p>
                        </div>
                      )}
                      <p className="text-slate-400 text-sm mb-4"><strong>Remarks:</strong> {container.remarks || 'None'}</p>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditItem(container, 'container')}
                          className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition"
                        >
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        {currentUser.role === 'admin' && (
                          <button
                            onClick={() => handleDeleteItem(container.containerId, 'container')}
                            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition"
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {showContainerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-800 rounded-lg p-6 w-full max-w-2xl border border-slate-700 max-h-[90vh] overflow-y-auto">
                    <h2 className="text-2xl font-bold text-white mb-4">{editingItem ? 'Edit Container' : 'Add New Container'}</h2>
                    <div className="grid grid-cols-2 gap-4">
                      <input type="text" placeholder="Container ID" value={containerForm.containerId} disabled={editingItem && currentUser.role !== 'admin'} onChange={(e) => setContainerForm({...containerForm, containerId: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 disabled:opacity-50" />
                      <input type="text" placeholder="Container Name" value={containerForm.containerName} disabled={editingItem && currentUser.role !== 'admin'} onChange={(e) => setContainerForm({...containerForm, containerName: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 disabled:opacity-50" />
                      <select value={containerForm.size} onChange={(e) => setContainerForm({...containerForm, size: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400">
                        <option value="20ft">20ft</option>
                        <option value="40ft">40ft</option>
                        <option value="45ft">45ft</option>
                      </select>
                      <select value={containerForm.type} onChange={(e) => setContainerForm({...containerForm, type: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400">
                        <option value="standard">Standard</option>
                        <option value="highcube">High Cube</option>
                        <option value="flatbed">Flatbed</option>
                      </select>
                      <select value={containerForm.status} disabled={editingItem && currentUser.role !== 'admin'} onChange={(e) => setContainerForm({...containerForm, status: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400 disabled:opacity-50">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <select value={containerForm.inUseStatus} disabled={editingItem && currentUser.role !== 'admin'} onChange={(e) => setContainerForm({...containerForm, inUseStatus: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400 disabled:opacity-50">
                        <option value="available">Available</option>
                        <option value="in-use">In Use</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      <input type="text" placeholder="Import Vessel" value={containerForm.importVessel} onChange={(e) => setContainerForm({...containerForm, importVessel: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="date" value={containerForm.eta} onChange={(e) => setContainerForm({...containerForm, eta: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="POL" value={containerForm.pol} onChange={(e) => setContainerForm({...containerForm, pol: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="POD" value={containerForm.pod} onChange={(e) => setContainerForm({...containerForm, pod: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="number" placeholder="Free Days" value={containerForm.freeDays} onChange={(e) => setContainerForm({...containerForm, freeDays: parseInt(e.target.value) || 0})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="BL Number" value={containerForm.blNumber} onChange={(e) => setContainerForm({...containerForm, blNumber: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="date" value={containerForm.dischargeDate} onChange={(e) => setContainerForm({...containerForm, dischargeDate: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400" />
                      <input type="date" value={containerForm.doIssueDate} onChange={(e) => setContainerForm({...containerForm, doIssueDate: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400" />
                      <input type="date" value={containerForm.gateOutDate} onChange={(e) => setContainerForm({...containerForm, gateOutDate: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400" />
                      <input type="date" value={containerForm.emptyReturnDate} onChange={(e) => setContainerForm({...containerForm, emptyReturnDate: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Import Country" value={containerForm.importCountry} onChange={(e) => setContainerForm({...containerForm, importCountry: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Current Location" value={containerForm.currentLocation} onChange={(e) => setContainerForm({...containerForm, currentLocation: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Agent/Customer" value={containerForm.agent} onChange={(e) => setContainerForm({...containerForm, agent: e.target.value})} className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                    </div>
                    <textarea placeholder="Remarks" value={containerForm.remarks} onChange={(e) => setContainerForm({...containerForm, remarks: e.target.value})} className="w-full mt-4 px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" rows="3"></textarea>
                    <div className="flex space-x-2 mt-6">
                      <button onClick={handleAddContainer} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">{editingItem ? 'Update' : 'Create'}</button>
                      <button onClick={() => setShowContainerModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition">Cancel</button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'customers' && (
            <div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setCustomerForm({ customerId: '', customerName: '', email: '', phone: '', address: '', country: '' });
                  setShowCustomerModal(true);
                }}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition"
              >
                <Plus size={20} />
                <span>Add Customer</span>
              </button>

              <div className="grid gap-4">
                {customers.length === 0 ? (
                  <p className="text-slate-400">No customers yet.</p>
                ) : (
                  customers.map(customer => (
                    <div key={customer.customerId} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                      <h3 className="text-xl font-bold text-white mb-2">{customer.customerName}</h3>
                      <p className="text-slate-400 text-sm mb-4">Email: {customer.email}</p>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditItem(customer, 'customer')} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition">
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        {currentUser.role === 'admin' && (
                          <button onClick={() => handleDeleteItem(customer.customerId, 'customer')} className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition">
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {showCustomerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">{editingItem ? 'Edit Customer' : 'Add Customer'}</h2>
                    <div className="space-y-4">
                      <input type="text" placeholder="Customer ID" value={customerForm.customerId} onChange={(e) => setCustomerForm({...customerForm, customerId: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Customer Name" value={customerForm.customerName} onChange={(e) => setCustomerForm({...customerForm, customerName: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="email" placeholder="Email" value={customerForm.email} onChange={(e) => setCustomerForm({...customerForm, email: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="tel" placeholder="Phone" value={customerForm.phone} onChange={(e) => setCustomerForm({...customerForm, phone: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Address" value={customerForm.address} onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Country" value={customerForm.country} onChange={(e) => setCustomerForm({...customerForm, country: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <div className="flex space-x-2">
                        <button onClick={handleAddCustomer} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">{editingItem ? 'Update' : 'Create'}</button>
                        <button onClick={() => setShowCustomerModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'leads' && (
            <div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setLeadForm({ leadId: '', companyName: '', contactPerson: '', email: '', phone: '', status: 'new', value: '' });
                  setShowLeadModal(true);
                }}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition"
              >
                <Plus size={20} />
                <span>Add Lead</span>
              </button>

              <div className="grid gap-4">
                {leads.length === 0 ? (
                  <p className="text-slate-400">No leads yet.</p>
                ) : (
                  leads.map(lead => (
                    <div key={lead.leadId} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                      <h3 className="text-xl font-bold text-white mb-2">{lead.companyName}</h3>
                      <p className="text-slate-400 text-sm mb-4">Contact: {lead.contactPerson}</p>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditItem(lead, 'lead')} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition">
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        {currentUser.role === 'admin' && (
                          <button onClick={() => handleDeleteItem(lead.leadId, 'lead')} className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition">
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {showLeadModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">{editingItem ? 'Edit Lead' : 'Add Lead'}</h2>
                    <div className="space-y-4">
                      <input type="text" placeholder="Lead ID" value={leadForm.leadId} onChange={(e) => setLeadForm({...leadForm, leadId: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Company Name" value={leadForm.companyName} onChange={(e) => setLeadForm({...leadForm, companyName: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Contact Person" value={leadForm.contactPerson} onChange={(e) => setLeadForm({...leadForm, contactPerson: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="email" placeholder="Email" value={leadForm.email} onChange={(e) => setLeadForm({...leadForm, email: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="tel" placeholder="Phone" value={leadForm.phone} onChange={(e) => setLeadForm({...leadForm, phone: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <select value={leadForm.status} onChange={(e) => setLeadForm({...leadForm, status: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400">
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                      </select>
                      <input type="text" placeholder="Potential Value" value={leadForm.value} onChange={(e) => setLeadForm({...leadForm, value: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <div className="flex space-x-2">
                        <button onClick={handleAddLead} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">{editingItem ? 'Update' : 'Create'}</button>
                        <button onClick={() => setShowLeadModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'accounts' && (
            <div>
              <button
                onClick={() => {
                  setEditingItem(null);
                  setAccountForm({ accountId: '', accountName: '', customer: '', balance: 0, status: 'active' });
                  setShowAccountModal(true);
                }}
                className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center space-x-2 transition"
              >
                <Plus size={20} />
                <span>Add Account</span>
              </button>

              <div className="grid gap-4">
                {accounts.length === 0 ? (
                  <p className="text-slate-400">No accounts yet.</p>
                ) : (
                  accounts.map(account => (
                    <div key={account.accountId} className="bg-slate-800 rounded-lg p-6 border border-slate-700">
                      <h3 className="text-xl font-bold text-white mb-2">{account.accountName}</h3>
                      <p className="text-slate-400 text-sm mb-4">Balance: ${account.balance.toFixed(2)}</p>
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditItem(account, 'account')} className="flex items-center space-x-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition">
                          <Edit2 size={16} />
                          <span>Edit</span>
                        </button>
                        {currentUser.role === 'admin' && (
                          <button onClick={() => handleDeleteItem(account.accountId, 'account')} className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm transition">
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>

              {showAccountModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                  <div className="bg-slate-800 rounded-lg p-6 w-full max-w-md border border-slate-700">
                    <h2 className="text-2xl font-bold text-white mb-4">{editingItem ? 'Edit Account' : 'Add Account'}</h2>
                    <div className="space-y-4">
                      <input type="text" placeholder="Account ID" value={accountForm.accountId} onChange={(e) => setAccountForm({...accountForm, accountId: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Account Name" value={accountForm.accountName} onChange={(e) => setAccountForm({...accountForm, accountName: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="text" placeholder="Customer" value={accountForm.customer} onChange={(e) => setAccountForm({...accountForm, customer: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <input type="number" placeholder="Balance" value={accountForm.balance} onChange={(e) => setAccountForm({...accountForm, balance: parseFloat(e.target.value) || 0})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400" />
                      <select value={accountForm.status} onChange={(e) => setAccountForm({...accountForm, status: e.target.value})} className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white focus:outline-none focus:border-blue-400">
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                      <div className="flex space-x-2">
                        <button onClick={handleAddAccount} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition">{editingItem ? 'Update' : 'Create'}</button>
                        <button onClick={() => setShowAccountModal(false)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded transition">Cancel</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
