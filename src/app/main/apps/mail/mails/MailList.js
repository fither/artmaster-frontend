import FuseUtils from '@fuse/utils';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import withRouter from '@fuse/core/withRouter';
import { WebSocketContext } from 'app/ws/WebSocket';
import FuseLoading from '@fuse/core/FuseLoading';
import { Button } from '@mui/material';
import {
  selectMails,
  setMailInitializing,
  setMailsLoading,
  setMailsMoreLoading,
  setMailsShouldRefresh,
  setPrevFolderName,
} from '../store/mailsSlice';
import MailListItem from './MailListItem';
import { setLabelsInitialized } from '../store/labelsSlice';

function MailList(props) {
  const dispatch = useDispatch();
  const mails = useSelector(selectMails);
  const searchText = useSelector(({ mailApp }) => mailApp.mails.searchText);
  const loading = useSelector(({ mailApp }) => mailApp.mails.loading);
  const moreLoading = useSelector(({ mailApp }) => mailApp.mails.moreLoading);
  const shouldRefresh = useSelector(({ mailApp }) => mailApp.mails.shouldRefresh);
  const mailInitialized = useSelector(({ mailApp }) => mailApp.mails.mailInitialized);
  const mailInitializing = useSelector(({ mailApp }) => mailApp.mails.mailInitializing);
  const prevFolderName = useSelector(({ mailApp }) => mailApp.mails.prevFolderName);
  const nextPageToken = useSelector(({ mailApp }) => mailApp.mails.nextPageToken);
  const labelsInitialzed = useSelector(({ mailApp }) => mailApp.labels.initialized);

  const routeParams = useParams();
  const [filteredData, setFilteredData] = useState(null);
  const { t } = useTranslation('mailApp');
  const ws = useContext(WebSocketContext);

  useEffect(() => {
    const isNavigatedToDifferentFolder = routeParams.folderHandle !== prevFolderName;

    if (isNavigatedToDifferentFolder) {
      dispatch(setMailsShouldRefresh(true));
    }

    if (shouldRefresh && !loading && mailInitialized && !mailInitializing) {
      dispatch(setMailsLoading(true));
      dispatch(setMailsShouldRefresh(false));
      ws.sendMessage('mail/findAll', routeParams.folderHandle);

      if (!labelsInitialzed) {
        ws.sendMessage('mail/findLabels');
        dispatch(setLabelsInitialized(true));
      }

      dispatch(setPrevFolderName(routeParams.folderHandle));
    }

    if (!mailInitialized && !mailInitializing) {
      dispatch(setMailInitializing(true));
      ws.sendMessage('mail/initialize');
    }
  }, [
    shouldRefresh,
    mailInitialized,
    loading,
    dispatch,
    ws,
    routeParams.folderHandle,
    mailInitializing,
    prevFolderName,
    labelsInitialzed,
  ]);

  useEffect(() => {
    function getFilteredArray() {
      if (searchText.length === 0) {
        return mails;
      }
      return FuseUtils.filterArrayByString(mails, searchText);
    }

    if (mails) {
      setFilteredData(getFilteredArray());
    }
  }, [mails, searchText]);

  function handleLoadMore() {
    dispatch(setMailsMoreLoading(true));
    ws.sendMessage('mail/loadMore', {
      labelId: routeParams.folderHandle,
      nextPageToken,
    });
  }

  if (loading) {
    return <FuseLoading />;
  }

  if (!filteredData) {
    return null;
  }

  if (filteredData.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.1 } }}
        className="flex flex-1 items-center justify-center h-full"
      >
        <Typography color="textSecondary" variant="h5">
          {t('NO_MESSAGES')}
        </Typography>
      </motion.div>
    );
  }

  const container = {
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <List className="p-0">
      <motion.div variants={container} initial="hidden" animate="show">
        {filteredData.map((mail) => (
          <motion.div variants={item} key={mail.id}>
            <MailListItem mail={mail} />
          </motion.div>
        ))}
      </motion.div>
      <Typography variant="h6" align="center">
        {moreLoading && <FuseLoading />}
        {!moreLoading && (
          <div style={{ marginTop: '2rem', marginBottom: '2rem' }}>
            <Button variant="outlined" color="inherit" onClick={handleLoadMore}>
              Load More
            </Button>
          </div>
        )}
      </Typography>
    </List>
  );
}

export default withRouter(MailList);
