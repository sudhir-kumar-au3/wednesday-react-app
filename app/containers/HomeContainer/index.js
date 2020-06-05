import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import get from 'lodash/get';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
import { Card, Skeleton, Input, Row, Col } from 'antd';
import styled from 'styled-components';
import { injectIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';
import T from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
import {
  selectHomeContainer,
  selectItuneData,
  selectItuneError,
  selectItuneName
} from './selectors';
import { homeContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;
const { Meta } = Card;
const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    padding: ${props => props.padding}px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function HomeContainer({
  dispatchItune,
  dispatchClearItune,
  intl,
  ituneData = {},
  ituneError = null,
  ituneName,
  maxwidth,
  padding
}) {
  useInjectSaga({ key: 'homeContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(ituneData, 'items', null) || ituneError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [ituneData]);

  const history = useHistory();

  const handleOnChange = iName => {
    if (!isEmpty(iName)) {
      dispatchItune(iName);
      setLoading(true);
    } else {
      dispatchClearItune();
    }
  };
  const debouncedHandleOnChange = debounce(handleOnChange, 200);

  const renderRepoList = () => {
    const items = get(ituneData, 'results', []);

    const totalCount = get(ituneData, 'resultCount', 0);
    return (
      (items.length !== 0 || loading) && (
        <Skeleton loading={loading} active>
          {ituneName && (
            <div>
              <T id="search_query" values={{ ituneName }} />
            </div>
          )}
          {totalCount !== 0 && (
            <div>
              <T id="matching_itune" values={{ totalCount }} />
            </div>
          )}
          <Row>
            {items.map((item, index) => (
              <Col key={index} span={6}>
                <Card
                  hoverable
                  style={{ width: 220 }}
                  cover={
                    <img alt={item.trackName} src={item.artworkUrl100}></img>
                  }
                >
                  <audio
                    preload="none"
                    controls
                    style={{ width: 150, padding: 5 }}
                  >
                    <source src={item.previewUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <Meta
                    title={item.trackName}
                    description={item.artistName}
                  ></Meta>
                </Card>
              </Col>
            ))}
          </Row>
        </Skeleton>
      )
    );
  };
  const renderErrorState = () => {
    let itunesError;
    if (ituneError) {
      itunesError = ituneError;
    } else if (!get(ituneData, 'totalCount', 0)) {
      itunesError = 'itune_search_default';
    }
    return (
      !loading &&
      itunesError && (
        <CustomCard
          color={ituneError ? 'red' : 'grey'}
          title={intl.formatMessage({ id: 'itune_list' })}
        >
          <T id={itunesError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container maxwidth={maxwidth} padding={padding}>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard
        title={intl.formatMessage({ id: 'itune_search' })}
        maxwidth={maxwidth}
      >
        <T marginBottom={10} id="get_itune_details" />
        <Search
          data-testid="search-bar"
          defaultValue={ituneName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
      {renderErrorState()}
    </Container>
  );
}

HomeContainer.propTypes = {
  dispatchItune: PropTypes.func,
  dispatchClearItune: PropTypes.func,
  intl: PropTypes.object,
  ituneData: PropTypes.shape({
    totalCount: PropTypes.number,
    incompleteResults: PropTypes.bool,
    items: PropTypes.array
  }),
  ituneError: PropTypes.object,
  ituneName: PropTypes.string,
  history: PropTypes.object,
  maxwidth: PropTypes.number,
  padding: PropTypes.number
};

HomeContainer.defaultProps = {
  maxwidth: 1440,
  padding: 20
};

const mapStateToProps = createStructuredSelector({
  homeContainer: selectHomeContainer(),
  ituneData: selectItuneData(),
  ituneError: selectItuneError(),
  ituneName: selectItuneName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetItune, clearItune } = homeContainerCreators;
  return {
    dispatchItune: ituneName => dispatch(requestGetItune(ituneName)),
    dispatchClearItune: () => dispatch(clearItune())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(HomeContainer);

export const HomeContainerTest = compose(injectIntl)(HomeContainer);
