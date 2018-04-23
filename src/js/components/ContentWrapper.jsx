import React from 'react';
import PropTypes from 'prop-types';
import cln from 'classnames';
import { If, Then, Else } from 'qc-react-conditionals/lib';

export default function ContentWrapper(props) {
  const { boxClass, noBox, children } = props;
  const cls = cln('box', { [boxClass]: !!boxClass });
  return (
    <section className="content">
      <div className="row">
        <div className="col-xs-12">
          <If is={noBox}>
            <Then>
              <div className="bg-white">{children}</div>
            </Then>
            <Else>
              <div className={cls}>{children}</div>
            </Else>
          </If>
        </div>
      </div>
    </section>
  );
}

ContentWrapper.defaultProps = {
  children: null,
  boxClass: '',
  noBox: false
};

ContentWrapper.propTypes = {
  children: PropTypes.node,
  boxClass: PropTypes.string,
  noBox: PropTypes.bool
};
