export const API_ENDPOINTS = {
  Customer: {
        Login: 'Customer/Login',
        Create: 'Customer/Register',
        VefiryUser: 'Customer/VefiryUser',
        VerifyOTP: 'Customer/VerifyOTP',
        SendOTP: 'Customer/SendOTP',
        ResetPassword: 'Customer/ResetPassword',
        UpdateUser:'Customer/UpdateUser',
        ChangePassword: 'Customer/ChangePassword',
        GetProfileLocalized: 'Customer/profile',  
        CustomersPointBalance: 'Customer/CustomersPointBalance',  
        profile: 'Customer/profile',// profile
        UpdateProfile:'Customer/UpdateProfile',
        GetCustomerBundlelist: 'Customer/GetCustomerBundlelist',
        GetMyPurchases:'Customer/GetMyPurchases',
        GetCustomerOrderServiceDetail:'Customer/GetCustomerOrderServiceDetail',
        GetCustomerOrderBundleDetail:'Customer/GetCustomerOrderBundleDetail',
        GetCustomerOrderSavingPackageDetail:'Customer/GetCustomerOrderSavingPackageDetail',
        CustomerServiceRequest:'Customer/CustomerServiceRequest',
        GetCustomerOrderServiceDetailByPoints:'Customer/GetCustomerOrderServiceDetailByPoints',
        GetNationalityForList:'Nationality/GetNationalityForList',
 
      },

      CustomerServiceRequest: {

        GetCustomerRequestList:'CustomerServiceRequest/GetCustomerRequestList',
        GetCustomerRequestDetail:'CustomerServiceRequest/GetCustomerRequestById',
        CreateServiceRequest:'CustomerServiceRequest/CreateServiceRequest',
        CalculateServiceTotalWithTax:'CustomerServiceRequest/CalculateServiceTotalWithTax',
                //cancel
                CancelOrder: 'CustomerServiceRequest/CancelOrder', 
                CancelOrUpdateOrderService: 'CustomerServiceRequest/CancelOrUpdateOrderService', 
      },
      Home: {
        GetBundleListForHome: 'Home/GetBundleListForHome',
        TrendingServices:'Home/TrendingProducts',
        GetAllMostViewedServices:'Home/GetAllMostViewedProducts',
        MostOrderedServices:'Home/MostOrderedProducts',
        MostViewedServices:'Home/MostViewedProducts',
        AdsManagement:'Home/AdsManagement',
        GetAllAds: 'Ad/GetAllAds',
        GetAllHomeCategory: 'Home/GetAllHomeCategory',
        GetAllHomeCategoryWithSubCategory: 'Home/GetAllHomeCategoryWithSubCategory',
        RecentNews: 'Home/RecentNews',
        GetCustomerFeedbackForList: 'CustomerFeedback/GetCustomerFeedbackForList',
        DealTodayServices: 'Home/DealTodayServices',
        AddToNewsletter: 'Home/AddToNewsletter'
      },
      Region: {
        GetAllForList: 'Region/GetAllForList',
      },
      City: {
        GetAllCitieswithRegion: 'City/GetAllForList',
      },

      Bundle: {
        GetBundleList: 'Bundle/GetBundleList',
        GetById: 'Bundle/GetById',
        PurchaseBundle: 'Bundle/PurchaseBundle',
        CalculateBundleTotalWithTax: 'Bundle/CalculateBundleTotalWithTax',
    
      },
      Category: {
        ParentCategoryAndServices: 'Category/ParentCategoryAndProducts',
        GetAllCategoryParentAndChilde: 'Category/GetParentCategoryForList',
      },
      Product: {
        GetProductByIdForHome: 'Product/GetProductByIdForHome',
        AddToCart: 'CustomerCarts/AddToCart',
      },
      News: {
        GetLocalizedNewsList: 'News/GetLocalizedNewsList',
        GetNewsByNewsCategory: 'News/GetNewsByNewsCategory',
        GetByIdAsyncWeb: 'News/GetByIdAsyncWeb',
        GetTopNewsByViews: 'News/GetTopNewsByViews',
      },
      CustomerWishlists: {
        AddToWishList: 'CustomerWishlists/AddToWishList',
        GetWhisListForCustomer: 'CustomerWishlists/GetWhisListForCustomer',
        RemoveFromWishList: 'CustomerWishlists/RemoveFromWishList',
      },
 
      Coupon: {
        ValidateCouponForCart: 'Coupon/ValidateCouponForCart',
        
      },
      Order: {
        GetCustomerOrderDetails: 'Order/GetCustomerOrderDetails',
        CustomerOrderServiceManagement: 'Order/CustomerOrderServiceManagement',
        CustomerSavingPackage: 'Order/CustomerSavingPackage',
   
        


        
      },

      CustomerServiceRequestAttachment: {
   
        GetRequestAttachment: 'CustomerServiceRequestAttachment/GetRequestAttachment',
        AddAttachmentNeededByCustomer: 'CustomerServiceRequestAttachment/AddAttachmentNeededByCustomer',
        UpdateAttachmentForOrderService: 'CustomerServiceRequestAttachment/UpdateAttachmentForOrderService',
        DeleteAttachmentForOrderService: 'CustomerServiceRequestAttachment/DeleteAttachmentForOrderService',
        GetAttachmentType: 'CustomerServiceRequestAttachment/GetAttachmentType', 
      },
      CustomerServiceRequestMessage: {
        GetComments: 'CustomerServiceRequestMessage/GetComments',
        CustomerCreateComment: 'CustomerServiceRequestMessage/CustomerCreateComment',
      },
      Lookups: {
        GetAllStatus: 'Lookups/GetAllStatus',
        
      },
      Tickers: {
        GetTopTickers: 'Ticker/GetTopTickers',
        GetAllTickers: 'Ticker/GetAllTickers',
        
      },
 
  };                                                    