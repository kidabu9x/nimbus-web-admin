/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import objectPath from "object-path";
import { withRouter } from "react-router-dom";
import * as builder from "../../ducks/builder";
import { LayoutContextConsumer } from "../LayoutContext";
// import BreadCrumbs from "./components/BreadCrumbs";

class SubHeader extends React.Component {
  render() {
    const {
      subheaderCssClasses,
      subheaderContainerCssClasses,
      subheaderMobileToggle,
    } = this.props;

    return (
      <div
        id="kt_subheader"
        className={`kt-subheader ${subheaderCssClasses} kt-grid__item`}
      >
        <div className={`kt-container ${subheaderContainerCssClasses}`}>
          <div className="kt-subheader__main">
            {subheaderMobileToggle && (
              <button
                className="kt-subheader__mobile-toggle kt-subheader__mobile-toggle--left"
                id="kt_subheader_mobile_toggle"
              >
                <span />
              </button>
            )}

            <LayoutContextConsumer>
              {({ subheader: { title } }) => (
                <>
                  <h3 className="kt-subheader__title">{title}</h3>
                </>
              )}
            </LayoutContextConsumer>

            <span className="kt-subheader__separator kt-subheader__separator--v" />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store) => ({
  subheaderCssClasses: builder.selectors.getClasses(store, {
    path: "subheader",
    toString: true,
  }),
  subheaderContainerCssClasses: builder.selectors.getClasses(store, {
    path: "subheader_container",
    toString: true,
  }),
  config: store.builder.layoutConfig,
  menuConfig: store.builder.menuConfig,
  subheaderMobileToggle: objectPath.get(
    store.builder.layoutConfig,
    "subheader.mobile-toggle"
  ),
});

export default withRouter(connect(mapStateToProps)(SubHeader));
