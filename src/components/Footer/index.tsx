import { useIntl } from 'umi';
import { HomeOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-layout';

export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: '中企软件技术支持',
  });

  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'Ant Design Pro',
          title: '七三八财务',
          href: 'localhost',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <HomeOutlined />,
          href: 'https://www.738cw.com/',
          blankTarget: true,
        },
        {
          key: 'Ant Design',
          title: '中企软件',
          href: 'localhost',
          blankTarget: true,
        },
      ]}
    />
  );
};
