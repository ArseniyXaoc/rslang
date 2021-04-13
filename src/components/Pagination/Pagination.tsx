
import React, {useState} from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { MemoryRouter, Route } from 'react-router';
import { Link } from 'react-router-dom';
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      "& > *": {
        marginTop: theme.spacing(2),
      },
    },
  },
}));

export default function PaginationLink({page, sectionId}) {
  const classes = useStyles();

  // return (
   {/* <MemoryRouter initialEntries={[`/section/${sectionId}`]} initialIndex={0}>
      <Route>
        {({ location }) => {*/}
          // const query = new URLSearchParams(location.search);
          // const page = parseInt(query.get('page') || '1', 10);

          return (
            <>
              <div className={classes.root}>

                <Pagination
                  color="primary"
                  defaultPage={7}
                  showFirstButton
                  showLastButton
                  page={parseInt(page)}
                  count={20}
                  renderItem={(item) => (
                    <PaginationItem
                      color="primary"
                      component={Link}
                      key={parseInt(page)}
                      to={`/section/${sectionId}/${item.page}`}
                      {...item}
                    />
                )}
              />
              </div>
            </>
          );
   /*     }}
      </Route>
    </MemoryRouter>*/
  // );
}