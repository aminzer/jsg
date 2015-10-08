var Scale = {

    getReal: function(virtualSizeOfObject) {
        return virtualSizeOfObject * CANVAS.getWidth() / CANVAS.getVirtualWidth();
    },

    getVirtual: function(realSizeOfObject) {
        return realSizeOfObject * CANVAS.getVirtualWidth() / CANVAS.getWidth();
    }
};
