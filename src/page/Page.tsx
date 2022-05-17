import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface Props<P> extends RouteComponentProps<P> {}

export default class Page<P = {}, S = {}> extends Component<Props<P>, S> {}
