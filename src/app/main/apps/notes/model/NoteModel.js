import _ from '@lodash';

function NoteModel(data) {
  data = data || {};

  return _.defaults(data, {
    title: '',
    description: '',
    archive: false,
    image: '',
    time: null,
    reminder: null,
    checklist: [],
    labels: [],
  });
}

export default NoteModel;
