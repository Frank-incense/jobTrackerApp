import { useForm } from 'react-hook-form';
import useApplications from '../hooks/useApplications';

const ApplyForm = ({ jobId }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { submitApplication } = useApplications();

  const onSubmit = (data) => {
    submitApplication({ ...data, jobId });
    alert('Application submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 border rounded">
      <h3 className="text-lg font-bold">Apply for Job</h3>
      <div>
        <textarea
          {...register('coverLetter', { required: 'Cover letter is required' })}
          placeholder="Cover Letter"
          className="w-full p-2 border rounded"
        />
        {errors.coverLetter && <p className="text-red-500">{errors.coverLetter.message}</p>}
      </div>
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
        Submit Application
      </button>
    </form>
  );
};

export default ApplyForm;