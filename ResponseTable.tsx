import { useState, useEffect, useCallback } from 'react';
import { ArrowUpDown, Download, RefreshCw } from 'lucide-react';
import { Response, getResponses, subscribeToResponses } from '../../lib/supabase';

type SortField = 'name' | 'age' | 'created_at';
type SortDirection = 'asc' | 'desc';

function ResponseTable() {
  const [responses, setResponses] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('created_at');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [refreshKey, setRefreshKey] = useState(0);

  // Function to fetch responses
  const fetchResponses = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { data, error } = await getResponses();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setResponses(data);
      }
    } catch (err) {
      setError('Failed to load responses. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize data and set up real-time subscription
  useEffect(() => {
    fetchResponses();
    
    const subscription = subscribeToResponses(() => {
      fetchResponses();
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [fetchResponses, refreshKey]);

  // Sort responses
  const sortedResponses = [...responses].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc'
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === 'age') {
      return sortDirection === 'asc'
        ? a.age - b.age
        : b.age - a.age;
    } else {
      return sortDirection === 'asc'
        ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  // Function to toggle sort
  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Function to handle refreshing data
  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  // Function to export data as CSV
  const exportToCSV = () => {
    if (responses.length === 0) {
      return;
    }
    
    const headers = ['Name', 'Age', 'Timestamp'];
    const csvData = responses.map(response => [
      response.name,
      response.age,
      new Date(response.created_at).toLocaleString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `survey-responses-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown size={16} className="ml-1 text-gray-400" />;
    }
    return sortDirection === 'asc' 
      ? <ArrowUpDown size={16} className="ml-1 text-blue-600 rotate-180" />
      : <ArrowUpDown size={16} className="ml-1 text-blue-600" />;
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Survey Responses</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-blue-600 rounded-md transition-colors"
            title="Refresh data"
          >
            <RefreshCw size={18} />
          </button>
          <button
            onClick={exportToCSV}
            disabled={responses.length === 0}
            className={`flex items-center space-x-1 py-1 px-3 rounded-md transition-colors
              ${responses.length === 0 
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-100 text-blue-700 hover:bg-blue-200'}`}
            title="Export as CSV"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>
      
      {loading ? (
        <div className="p-8 text-center">
          <div className="animate-spin inline-block w-6 h-6 border-2 border-gray-300 border-t-blue-600 rounded-full mb-2"></div>
          <p className="text-gray-600">Loading responses...</p>
        </div>
      ) : error ? (
        <div className="p-8 text-center">
          <p className="text-red-500">{error}</p>
          <button
            onClick={handleRefresh}
            className="mt-2 text-blue-600 hover:text-blue-800 underline"
          >
            Try Again
          </button>
        </div>
      ) : responses.length === 0 ? (
        <div className="p-8 text-center">
          <p className="text-gray-500">No responses yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('name')}
                >
                  <div className="flex items-center">
                    Name {getSortIcon('name')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('age')}
                >
                  <div className="flex items-center">
                    Age {getSortIcon('age')}
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => toggleSort('created_at')}
                >
                  <div className="flex items-center">
                    Timestamp {getSortIcon('created_at')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedResponses.map((response) => (
                <tr key={response.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {response.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {response.age}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(response.created_at)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ResponseTable;