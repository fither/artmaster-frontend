import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

function MailAttachmentUpload(props) {
  function handleChange(e) {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();

    reader.readAsBinaryString(file);

    reader.onload = () => {
      if (props.onChange) {
        props.onChange({
          base64: btoa(reader.result),
          name: file.name,
        });
      }
    };

    reader.onerror = () => {
      console.log('error on load image');
    };
  }

  return (
    <>
      <label htmlFor="button-file">
        <input accept="*" className="hidden" id="button-file" type="file" onChange={handleChange} />
        <IconButton className="w-32 h-32 mx-4 p-0" component="span" size="large">
          <Icon fontSize="small">attach_file</Icon>
        </IconButton>
      </label>
    </>
  );
}

export default MailAttachmentUpload;
