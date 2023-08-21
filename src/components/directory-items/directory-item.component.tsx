import { useNavigate } from 'react-router-dom';
import { DirectoryItemType } from '../directory/directory.component';

import {
  BackgroundImage,
  Body,
  DirectoryItemContainer,
} from './directory-item.styles';

type DirectoryItemProps = {
  directoryItem: DirectoryItemType;
};

const DirectoryItem = ({ directoryItem }: DirectoryItemProps) => {
  const navigate = useNavigate();
  const { title, imageUrl, route } = directoryItem;

  const onNavigateHandler = () => navigate(route);

  return (
    <DirectoryItemContainer onClick={onNavigateHandler}>
      <BackgroundImage imageUrl={imageUrl} />
      <Body>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </Body>
    </DirectoryItemContainer>
  );
};

export default DirectoryItem;
