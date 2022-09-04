import * as React from 'react';
import Button from '@mui/material/Button';
import ListIcon from '@mui/icons-material/List';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import { sortProducts } from '../../../features/product/productSlice';

export default function Sorting() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  };

  const sort = (event: Event | React.SyntheticEvent, sortType: string) => {
    dispatch(sortProducts(sortType));
    handleClose(event);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack direction='row' spacing={2}>
      <div>
        <Button
          ref={anchorRef}
          id='composition-button'
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup='true'
          endIcon={<ListIcon />}
          color='inherit'
          onClick={handleToggle}>
          Order By
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement='bottom-start'
          transition
          disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id='composition-menu'
                    aria-labelledby='composition-button'
                    onKeyDown={handleListKeyDown}>
                    <MenuItem
                      onClick={e => {
                        sort(e, 'lowerPrice');
                      }}>
                      Lower Price
                    </MenuItem>

                    <MenuItem
                      onClick={e => {
                        sort(e, 'higherPrice');
                      }}>
                      Higher Price
                    </MenuItem>

                    <MenuItem
                      onClick={e => {
                        sort(e, 'nameAZ');
                      }}>
                      By name AZ
                    </MenuItem>

                    <MenuItem
                      onClick={e => {
                        sort(e, 'nameZA');
                      }}>
                      By name ZA
                    </MenuItem>
                    <MenuItem
                      onClick={e => {
                        sort(e, 'bestSellers');
                      }}>
                      Best sellers
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
