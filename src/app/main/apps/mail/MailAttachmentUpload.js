import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
}

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
          content: btoa(reader.result),
          filename: file.name,
          size: formatBytes(file.size),
          mimeType: file.type,
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
