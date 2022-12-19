<?php
?>
<div class="container__header">
    <div class="container__header-search">
        <!-- <i class="fa-solid fa-arrow-left container__header-search-icon"></i>
        <i class="fa-solid fa-arrow-right container__header-search-icon"></i> -->
        <label for="navbar__mobile-header"><i class="fa-solid fa-bars container__header-search-menu-mobile"></i></label>
        <div class="container__header-with-search">
            <i class="fa-solid fa-magnifying-glass"></i>
            <div class="autocomplete">
                <!-- <input type="text" placeholder="Tìm kiếm bài hát,..." class="container__header-with-search-input"> -->
                <input id="myInput" type="text" name="myCountry" placeholder="Tìm kiếm" class="container__header-with-search-input">
            </div>
            <div class="container__header-with-search-result">
                <h4>Đề xuất cho bạn</h4>
            </div>
        </div>
    </div>
    <div class="container__header-control">
        <!-- <a class="container__header-control-item hide-on-tablet">
            <i class="fa-solid fa-bell"></i>
        </a> -->
        <a href="../logout.php" class="container__header-control-item">
            <i class="fa-solid fa-right-from-bracket"></i>
        </a>
    </div>
    <div class="container__header-control-mobile">
        <a href="../logout.php" class="container__header-control-item">
            <i class="fa-solid fa-right-from-bracket"></i>
        </a>
    </div>
</div>

<!-- <script>
    document.querySelector('.container__header-control-item').onclick = () => {
        console.log("Click A");
        window.location.href = "../logout.php"
    }   
</script> -->