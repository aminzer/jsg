var Scale = {

    getReal: function(virtualSizeOfObject) {
        return virtualSizeOfObject * Canvas.getWidth() / Canvas.getVirtualWidth();
    },

    getVirtual: function(realSizeOfObject) {
        return realSizeOfObject * Canvas.getVirtualWidth() / Canvas.getWidth();
    }
};
