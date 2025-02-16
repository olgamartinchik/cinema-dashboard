import styled from '@emotion/styled';
import Divider from '@mui/material/Divider';

export const CustomDivider = styled(Divider)`
  width: 100%;
  margin: 10px 0;
  border-color: ${({ theme }) => theme.palette.primary.main};
`;
