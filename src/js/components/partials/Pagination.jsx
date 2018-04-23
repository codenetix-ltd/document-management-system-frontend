import React, { Component } from 'react';
import cln from 'classnames';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import { DataLink } from 'Components/common/dataControls';

@autobind
export default class ReactTablePagination extends Component {
  static defaultProps = {
    page: 1,
    pages: -1,
    onPageChange: () => {},
    canPrevious: false,
    canNext: false,
    className: '',
    paginationStyle: null,
    previousText: '',
    nextText: ''
  };

  static propTypes = {
    page: PropTypes.number,
    pages: PropTypes.number,
    onPageChange: PropTypes.func,
    canPrevious: PropTypes.bool,
    canNext: PropTypes.bool,
    className: PropTypes.string,
    paginationStyle: PropTypes.any,
    previousText: PropTypes.string,
    nextText: PropTypes.string
  };

  onPrevClick() {
    const { canPrevious, page } = this.props;
    if (!canPrevious) return;
    this.changePage(page - 1);
  }

  onNextClick() {
    const { canNext, page } = this.props;
    if (!canNext) return;
    this.changePage(page + 1);
  }

  onPageClick(page) {
    this.changePage(page);
  }

  getSafePage(page) {
    if (Number.isNaN(page)) {
      page = this.props.page; // eslint-disable-line
    }
    return Math.min(Math.max(page, 0), this.props.pages - 1);
  }

  changePage(pageNum) {
    const page = this.getSafePage(pageNum);
    if (this.props.page !== page) {
      this.props.onPageChange(page);
    }
  }

  render() {
    const {
      pages,
      page,
      canNext,
      className,
      paginationStyle,
      previousText,
      nextText
    } = this.props;

    // todo: use https://github.com/ultimate-pagination/react-ultimate-pagination
    const pagesList = Array.from({ length: pages }, () => '').map((p, index) => {
      const thresholdMax = page + 5;
      const thresholdMin = thresholdMax - 5;
      const pageNum = index + 1;
      const cls = cln('paginate_button', { active: index === page });
      if (pageNum === pages) {
        return (
          <li key={index} className={cls}>
            <DataLink data={index} onClick={this.onPageClick}>{pageNum}</DataLink>
          </li>
        );
      }
      if (pageNum === thresholdMax) {
        return (
          <li key={index} className="paginate_button disabled">
            <DataLink>...</DataLink>
          </li>
        );
      }
      if (pageNum > thresholdMax || pageNum <= thresholdMin) return null;
      return (
        <li key={index} className={cls}>
          <DataLink data={index} onClick={this.onPageClick}>{pageNum}</DataLink>
        </li>
      );
    });

    return (
      <ul className={cln(className, ' pagination')} style={paginationStyle}>
        <li className={cln('paginate_button', 'previous', { disabled: !canNext })}>
          <DataLink onClick={this.onPrevClick}>{previousText}</DataLink>
        </li>
        {pagesList}
        <li className={cln('paginate_button', 'next', { disabled: !canNext })}>
          <DataLink onClick={this.onNextClick}>{nextText}</DataLink>
        </li>
      </ul>
    );
  }
}
