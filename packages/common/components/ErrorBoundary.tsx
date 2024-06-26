"use client"

import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type PropsWithRef,
  type ReactNode,
} from "react"

export const isDifferentArray = (a: unknown[] = [], b: unknown[] = []) => {
  return (
    a.length !== b.length || a.some((item, index) => !Object.is(item, b[index]))
  )
}

type RenderFallbackProps<ErrorType extends Error = Error> = {
  error: ErrorType
  reset: (...args: unknown[]) => void
}

type RenderFallbackType = <ErrorType extends Error>(
  props: RenderFallbackProps<ErrorType>,
) => ReactNode
type IgnoreErrorType = <ErrorType extends Error = Error>(
  error: ErrorType,
) => boolean

type Props<ErrorType extends Error = Error> = {
  resetKeys?: unknown[]
  onReset?(): void
  render: RenderFallbackType
  onError?(error: ErrorType, info: ErrorInfo): void
  ignoreError?: IgnoreErrorType
}

interface State<ErrorType extends Error = Error> {
  error: ErrorType | null
}

const initialState: State = {
  error: null,
}

export class ErrorBoundary extends Component<
  PropsWithRef<PropsWithChildren<Props>>,
  State
> {
  state = initialState
  updatedWithError = false

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const { onError, ignoreError } = this.props

    if (ignoreError?.(error)) {
      throw error
    }

    onError?.(error, info)
  }

  resetState() {
    this.updatedWithError = false
    this.setState(initialState)
  }

  resetErrorBoundary = () => {
    this.props.onReset?.()
    this.resetState()
  }

  componentDidUpdate(prevProps: Props) {
    const { error } = this.state

    if (error == null) {
      return
    }

    const { resetKeys } = this.props

    if (!this.updatedWithError) {
      this.updatedWithError = true
      return
    }

    if (isDifferentArray(prevProps.resetKeys, resetKeys)) {
      this.resetErrorBoundary()
    }
  }

  render() {
    const { children, render } = this.props
    const { error } = this.state

    if (error != null) {
      return render({
        error,
        reset: this.resetErrorBoundary,
      })
    }

    return children
  }
}
