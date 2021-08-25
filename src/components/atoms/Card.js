export default {
  render(h) {
    return (
      <div
        style={{
          background: '#fff'
        }}
      >
        {this.$scopedSlots.default && this.$scopedSlots.default()}
      </div>
    )
  }
}
