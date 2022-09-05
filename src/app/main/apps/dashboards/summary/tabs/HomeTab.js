import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import FuseLoading from '@fuse/core/FuseLoading';
import { selectWidgets } from '../store/widgetsSlice';
import Widget1 from '../widgets/Widget1';
import Widget2 from '../widgets/Widget2';
import Widget3 from '../widgets/Widget3';
import Widget4 from '../widgets/Widget4';
import Widget5 from '../widgets/Widget5';
import Widget6 from '../widgets/Widget6';
import Widget7 from '../widgets/Widget7';
import Widget10 from '../widgets/Widget10';

function HomeTab() {
  const widgets = useSelector(selectWidgets);
  const widgetsLoading = useSelector(
    ({ summaryDashboardApp }) => summaryDashboardApp.widgets.loading
  );

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
    <motion.div className="flex flex-wrap" variants={container} initial="hidden" animate="show">
      {widgetsLoading && <FuseLoading />}
      {!widgetsLoading && (
        <>
          <motion.div variants={item} className="widget flex w-full sm:w-1/3 p-12">
            {widgets.mostSelledWidget && <Widget1 widget={widgets.mostSelledWidget} />}
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/3 p-12">
            {widgets.last30DaysBookingsWidget && (
              <Widget2 widget={widgets.last30DaysBookingsWidget} />
            )}
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/3 p-12">
            {widgets.last30DaysProductsWidget && (
              <Widget3 widget={widgets.last30DaysProductsWidget} />
            )}
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/3 md:w-1/3 p-12">
            {widgets.mostBookingDate && <Widget2 widget={widgets.mostBookingDate} />}
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/3 md:w-1/3 p-12">
            {/* <Widget3 widget={widgets.widget3} /> */}
            {widgets.mostBookingTime && <Widget3 widget={widgets.mostBookingTime} />}
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/3 md:w-1/3 p-12">
            {/* <Widget4 widget={widgets.widget4} /> */}
            {widgets.todaysBookingsWidget && <Widget4 widget={widgets.todaysBookingsWidget} />}
          </motion.div>
          <motion.div variants={item} className="widget flex w-full p-12">
            {widgets.productSellings && <Widget10 widget={widgets.productSellings} />}
          </motion.div>
          {/* <motion.div variants={item} className="widget flex w-full p-12">
            <Widget5 widget={widgets.widget5} />
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
            <Widget6 widget={widgets.widget6} />
          </motion.div>
          <motion.div variants={item} className="widget flex w-full sm:w-1/2 p-12">
            <Widget7 widget={widgets.widget7} />
          </motion.div> */}
        </>
      )}
    </motion.div>
  );
}

export default HomeTab;
