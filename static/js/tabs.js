// 标签式二级菜单交互
$(document).ready(function() {
  // 缓存常用DOM元素，提高性能
  var $tabContainers = $('.tab-container');
  
  // 为每个tab-menu下的tab-item添加点击事件
  $('.tab-menu .tab-item').click(function(e) {
    // 阻止事件冒泡，提高响应速度
    e.stopPropagation();
    
    // 获取当前点击的标签
    var tabId = $(this).data('tab');
    
    // 移除同级标签的active类
    $(this).siblings().removeClass('active');
    
    // 为当前点击的标签添加active类
    $(this).addClass('active');
    
    // 获取标签容器
    var tabContainer = $(this).closest('.tab-container');
    
    // 直接操作需要隐藏和显示的元素，减少DOM查询
    tabContainer.find('.tab-content.active').removeClass('active');
    tabContainer.find('.tab-content[data-tab="' + tabId + '"]').addClass('active');
  });
  
  // 初始化：激活每个标签组的第一个标签
  $tabContainers.each(function() {
    $(this).find('.tab-menu .tab-item:first').click();
  });
  
  // 处理来自URL的标签激活请求
  function activateTabFromHash() {
    var hash = window.location.hash;
    if (hash && hash.indexOf('-tab-') > -1) {
      var tabElement = $(hash);
      if (tabElement.length) {
        // 直接激活标签，不等待
        tabElement.click();
        
        // 立即滚动到正确的位置
        var pos = tabElement.offset().top - 100;
        $("html,body").animate({
          scrollTop: pos
        }, 150); // 减少动画时间
      }
    }
  }
  
  // 初始化时立即检查URL哈希值
  activateTabFromHash();
  
  // 监听URL哈希变化
  $(window).on('hashchange', activateTabFromHash);
}); 