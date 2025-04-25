import useApplications from '../hooks/useApplications';
import ApplicationCard from '../components/ApplicationCard';

const Applications = () => {
  const { applications, loading, error } = useApplications();

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Applications</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {applications.length === 0 && !loading && <p>No applications yet.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {applications.map((app) => (
          <ApplicationCard key={app.id} application={app} />
        ))}
      </div>
    </div>
  );
};

export default Applications;