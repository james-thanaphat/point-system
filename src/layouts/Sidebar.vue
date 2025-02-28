<template>
    <aside class="col-md-2 d-none d-md-block bg-light sidebar">
        <div class="sidebar-sticky">
            <h6 class="sidebar-heading">
                <span>Menu</span>
            </h6>

            <ul class="nav flex-column">
                <li class="nav-item">
                    <router-link to="/" class="nav-link" active-class="active" aria-current="page">
                        <i class="fa fa-home"></i>
                        Home
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/reward" class="nav-link" active-class="active">
                        <i class="fa fa-pencil-square-o"></i>
                        Reward
                    </router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/profile" class="nav-link" active-class="active">
                        <i class="fa fa-user-o"></i>
                        Profile
                    </router-link>
                </li>
            </ul>
        </div>
    </aside>
</template>
