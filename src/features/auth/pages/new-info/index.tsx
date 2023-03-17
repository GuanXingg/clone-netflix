import NewInfoForm from '../../components/new-info-form';
import { NewInfoValues } from '../../services/interface';

function NewInfo() {
  const handleSubmitValues = async (values: NewInfoValues) => {
    console.log('>>> Check  file: index.tsx:14  values:', values);
  };

  return (
    <section className="theme-public-hidden">
      <NewInfoForm submitForm={handleSubmitValues} />
    </section>
  );
}

export default NewInfo;
