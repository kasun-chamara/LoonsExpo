/**
 * MainCard component for primary content sections, with padding and optional title.
 * @param {object} props - The props for MainCard.
 * @param {React.ReactNode} [props.title] - Optional title to display.
 * @param {object} [props.style] - Optional style overrides.
 * @param {React.ReactNode} [props.children] - Card content.
 */
import React, { Component } from "react";
import { Card } from '@mui/material'
import { any } from "prop-types";

class MainCard extends Component {
    static propTypes = {
        title: any,
        style: any,
        children: Node,
    };

    static defaultProps = {
        title: null,

    };


    render() {
        const {
            children,
            sx,
            style
        } = this.props;


        return (

            <Card style={style} className="px-4 py-4"
                sx={{
                    boxShadow: '0 2px 8px 0 rgba(34,41,47,0.08)',
                    borderRadius: 2,
                    ...sx,
                }}>
                {children}
            </Card>


        );
    }
}

export default MainCard;
